import os
import sys

# HIDE TENSORFLOW WARNINGS
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

try:
    import tensorflow as tf
    from tensorflow.keras import layers, models
    from tensorflow.keras.preprocessing.image import ImageDataGenerator
    import numpy as np
except Exception as e:
    print("\n--- IMPORT ERROR ---")
    print("Please run: pip install tensorflow pillow numpy")
    sys.exit(1)

# --- CONFIGURATION ---
DATASET_PATH = 'dataset'
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 15
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 15

if not os.path.exists(DATASET_PATH) or not any(os.scandir(DATASET_PATH)):
    print(f"\n--- ACTION REQUIRED ---")
    print(f"I have created the 'dataset' folder for you.")
    print(f"Please put your leaf images into the subfolders in: {os.path.abspath(DATASET_PATH)}")
    print(f"Subfolders: Healthy, Cercospora, Powdery_Mildew, Yellow_Mosaic")
    print(f"Once you've added the images, run 'python train_model.py' again.")
    sys.exit(0)

# Data Preparation
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=30,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

print("Loading dataset...")
train_generator = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

validation_generator = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# Build Model
print("Building CNN model...")
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3), 
    include_top=False, 
    weights='imagenet'
)
base_model.trainable = False

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(256, activation='relu'),
    layers.BatchNormalization(),
    layers.Dropout(0.3),
    layers.Dense(train_generator.num_classes, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train
print("Starting training (this may take a while)...")
history = model.fit(
    train_generator,
    validation_data=validation_generator,
    epochs=EPOCHS
)

# Save
model.save('black_gram_model.h5')
print("\n--- Success! ---")
print("Model saved as: black_gram_model.h5")
print("Class Indices:", train_generator.class_indices)

with open('labels.txt', 'w') as f:
    # Save labels in order
    labels = sorted(train_generator.class_indices.items(), key=lambda x: x[1])
    for label, _ in labels:
        f.write(f"{label}\n")
print("Labels saved as: labels.txt")
