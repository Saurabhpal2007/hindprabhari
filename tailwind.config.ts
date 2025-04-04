
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				// Material Design 3 shape scale
				'none': '0px',
				'xs': '4px', // Extra Small
				'sm': '8px', // Small
				'md': '12px', // Medium
				'lg': '16px', // Large
				'xl': '28px', // Extra Large
				'full': '9999px', // Full (pill or circular)
				
				// Legacy radius values
				DEFAULT: 'var(--radius)',
				'DEFAULT': 'var(--radius)',
				'radius-md': 'var(--radius-md)',
				'radius-sm': 'var(--radius-sm)',
				'radius-full': 'var(--radius-full)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(8px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '1' }
				},
				'ripple': {
					'0%': { transform: 'scale(0)', opacity: '0.12' },
					'100%': { transform: 'scale(2)', opacity: '0' }
				},
				// Material Design 3 specific animations
				'md-ripple': {
					'0%': { transform: 'scale(0)', opacity: '0.12' },
					'100%': { transform: 'scale(2)', opacity: '0' }
				},
				'md-fade-in': {
					'0%': { opacity: '0', transform: 'translateY(8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'md-scale-up': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'md-fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-8px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s var(--md-motion-easing-standard)',
				'accordion-up': 'accordion-up 0.2s var(--md-motion-easing-standard)',
				'fade-in': 'fade-in 0.3s var(--md-motion-easing-standard)',
				'fade-out': 'fade-out 0.3s var(--md-motion-easing-standard)',
				'scale-in': 'scale-in 0.2s var(--md-motion-easing-standard)',
				'slide': 'slide 25s linear infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'ripple': 'ripple 0.5s var(--md-motion-easing-standard)',
				// Material Design 3 animations
				'md-ripple': 'md-ripple 0.5s var(--md-motion-easing-standard)',
				'md-fade-in': 'md-fade-in 0.3s var(--md-motion-easing-standard)',
				'md-scale-up': 'md-scale-up 0.3s var(--md-motion-easing-standard)',
				'md-fade-in-left': 'md-fade-in-left 0.3s var(--md-motion-easing-standard)',
			},
			boxShadow: {
				// Material Design 3 elevation levels
				'elevation-1': 'var(--md-elevation-level1)',
				'elevation-2': 'var(--md-elevation-level2)',
				'elevation-3': 'var(--md-elevation-level3)',
				'elevation-4': 'var(--md-elevation-level4)',
				'elevation-5': 'var(--md-elevation-level5)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
