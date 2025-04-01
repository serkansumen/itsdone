// styles/globalStyles.ts
import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export default StyleSheet.create({
  // --- Genel Kapsayıcılar ---
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg, // Yanlardan boşluk
    paddingVertical: spacing.md,   // Üstten/alttan boşluk
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  scrollViewContainer: { // ScrollView'un contentContainerStyle'ı için
    flexGrow: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  row: { // Yatayda hizalama için yardımcı
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: { // Row içinde elemanları ayırmak için
    justifyContent: 'space-between',
  },

  // --- Metin Stilleri ---
  text: {
    fontSize: typography.fontSize.md,
    color: colors.text,
    // fontFamily: typography.fontFamily.regular, // Font ailesi tanımlıysa
  },
  textSecondary: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    // fontFamily: typography.fontFamily.regular,
  },
  title: {
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.bold,
    color: colors.dark,
    marginBottom: spacing.md,
    // fontFamily: typography.fontFamily.bold,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    // fontFamily: typography.fontFamily.semibold, // Eğer varsa
  },
  link: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    // fontFamily: typography.fontFamily.medium, // Eğer varsa
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.danger,
    marginTop: spacing.xs,
    // fontFamily: typography.fontFamily.regular,
  },

  // --- Düğme Stilleri ---
  button: { // Genel düğme görünümü (TouchableOpacity için)
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48, // Dokunma alanını iyileştirmek için
    marginVertical: spacing.sm, // Düğmeler arası boşluk
  },
  buttonPrimary: { // Ana düğme
    backgroundColor: colors.primary,
  },
  buttonSecondary: { // İkincil düğme
    backgroundColor: colors.secondary,
  },
  buttonOutline: { // Kenarlıklı düğme
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: { // Genel düğme metni
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    textAlign: 'center',
    // fontFamily: typography.fontFamily.bold,
  },
  buttonTextOutline: { // Kenarlıklı düğme metni
    color: colors.primary,
  },
  buttonDisabled: { // Devre dışı düğme
    backgroundColor: colors.border,
    opacity: 0.7,
  },
  buttonTextDisabled: { // Devre dışı düğme metni
    color: colors.textSecondary,
  },

  // --- Giriş Alanı Stilleri (TextInput) ---
  inputContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: typography.fontSize.md,
    color: colors.text,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.sm,
    // fontFamily: typography.fontFamily.medium,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? spacing.md : spacing.sm, // iOS/Android padding farkı
    fontSize: typography.fontSize.md,
    color: colors.text,
    minHeight: 48, // Dokunma alanını iyileştirmek için
    // fontFamily: typography.fontFamily.regular,
  },
  inputFocused: { // Odaklanıldığında kenarlık rengi
    borderColor: colors.primary,
    borderWidth: 1.5, // Biraz daha belirgin
  },
  inputError: { // Hata durumunda kenarlık rengi
    borderColor: colors.danger,
  },

  // --- Diğer Yardımcı Stiller ---
  separator: { // Ayırıcı çizgi
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  shadow: { // Platforma özgü gölge
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  modalBackground: { // Modal arka planı için
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Yarı saydam siyah
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalContent: { // Modal içeriği için
      backgroundColor: colors.white,
      padding: spacing.xl,
      borderRadius: 12,
      width: '85%', // Ekran genişliğinin %85'i
      maxWidth: 400, // Maksimum genişlik
      alignItems: 'center',
  },

});
