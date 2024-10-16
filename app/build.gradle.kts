plugins {
    id("com.android.application")
    id("com.google.gms.google-services") // Firebase Google Services eklentisi
    id("org.jetbrains.kotlin.android")
}

android {
    compileSdk = 31

    defaultConfig {
        applicationId = "com.globalservice.itsdone"  // Uygulamanın package ismi
        minSdk = 21
        targetSdk = 31
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
}

dependencies {
    // Firebase platformu için BoM (Bill of Materials) kullanıyoruz
    implementation(platform("com.google.firebase:firebase-bom:33.4.0"))

    // Firebase Authentication SDK
    implementation("com.google.firebase:firebase-auth")

    // Firebase Analytics SDK (opsiyonel)
    implementation("com.google.firebase:firebase-analytics")
}
