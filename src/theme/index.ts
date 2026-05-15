/**
 * @fileoverview Design system tokens: colors, typography, spacing, and shadows.
 */

export const Colors = {
  background: '#0B0D17',
  surface: '#141728',
  surfaceAlt: '#1C2035',
  card: '#1A1E35',
  cardBorder: '#252A45',

  primary: '#00D4FF',
  primaryMuted: 'rgba(0, 212, 255, 0.15)',
  secondary: '#7C3AED',
  accent: '#F59E0B',

  alive: '#22C55E',
  dead: '#EF4444',
  unknown: '#6B7280',

  textPrimary: '#F0F4FF',
  textSecondary: '#8892B0',
  textMuted: '#4A5568',

  border: '#252A45',
  divider: 'rgba(255,255,255,0.06)',

  tabBarBg: '#0F1220',
  tabBarActive: '#00D4FF',
  tabBarInactive: '#4A5568',

  skeletonBase: '#1C2035',
  skeletonHighlight: '#252A45',

  overlay: 'rgba(0,0,0,0.6)',
} as const;

export const Typography = {
  fontSizeXS: 10,
  fontSizeSM: 12,
  fontSizeMD: 14,
  fontSizeLG: 16,
  fontSizeXL: 18,
  fontSize2XL: 22,
  fontSize3XL: 28,

  fontWeightRegular: '400' as const,
  fontWeightMedium: '500' as const,
  fontWeightSemiBold: '600' as const,
  fontWeightBold: '700' as const,

  lineHeightSM: 16,
  lineHeightMD: 20,
  lineHeightLG: 24,
  lineHeightXL: 28,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const Shadows = {
  card: {
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  glow: {
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

export const HEADER_HEIGHT = 60;
export const TAB_BAR_HEIGHT = 60;
