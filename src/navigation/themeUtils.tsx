import { Theme } from '@react-navigation/native';
import { MD3Theme } from 'react-native-paper';

export const getNavigationTheme = (paperTheme: MD3Theme): Theme => {
  const isDark = paperTheme.dark;
  
  return {
    dark: isDark,
    colors: {
      primary: paperTheme.colors.primary,
      background: paperTheme.colors.background,
      card: paperTheme.colors.elevation?.level2 || paperTheme.colors.surface,
      text: paperTheme.colors.onSurface,
      border: paperTheme.colors.outline,
      notification: paperTheme.colors.error,
    },
    fonts: {
      regular: {
        fontFamily: paperTheme.fonts.bodyMedium.fontFamily,
        fontWeight: '400' as const,
      },
      medium: {
        fontFamily: paperTheme.fonts.bodyMedium.fontFamily,
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: paperTheme.fonts.bodyMedium.fontFamily,
        fontWeight: '700' as const,
      },
      heavy: {
        fontFamily: paperTheme.fonts.bodyMedium.fontFamily,
        fontWeight: '800' as const,
      }
    }
  };
};