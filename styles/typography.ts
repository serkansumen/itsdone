// styles/typography.ts
import { Platform } from 'react-native';

// İsterseniz özel fontları buraya ekleyebilirsiniz.
// const fontFamilyRegular = Platform.select({ ios: 'System', android: 'Roboto' });
// const fontFamilyBold = Platform.select({ ios: 'System-Bold', android: 'Roboto-Bold' });

export const typography = {
  // fontFamily: {
  //   regular: fontFamilyRegular,
  //   bold: fontFamilyBold,
  // },
  fontSize: {
    xs: 10, // Çok küçük
    sm: 12, // Küçük
    md: 14, // Orta (varsayılan metin)
    lg: 16, // Büyük
    xl: 18, // Çok büyük
    h1: 32, // Başlık 1
    h2: 28, // Başlık 2
    h3: 24, // Başlık 3
    h4: 20, // Başlık 4
  },
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
};
