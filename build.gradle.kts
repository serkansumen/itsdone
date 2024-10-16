plugins {
    // Diğer eklentiler
    id("com.android.application") version "8.0.2" apply false
    id("com.google.gms.google-services") version "4.4.2" apply false
}

repositories {
    google()  // Google deposunu ekle
    mavenCentral()
}
