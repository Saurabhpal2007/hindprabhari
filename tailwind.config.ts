
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
				lg: 'var(--radius)',
				md: 'var(--radius-md)',
				sm: 'var(--radius-sm)',
				full: 'var(--radius-full)',
				// Material You radius scale
				'xs': '4px',
				'md': '12px',
				'lg': '16px',
				'xl': '24px',
				'2xl': '28px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
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
					'0%': { transform: 'scale(0)', opacity: '0.5' },
					'100%': { transform: 'scale(2.5)', opacity: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				// Material Design specific animations
				'md-ripple': {
					'0%': { transform: 'scale(0)', opacity: '0.12' },
					'100%': { transform: 'scale(100)', opacity: '0' }
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
				},
				'md-stagger-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'md-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(180deg)' }
				},
				'md-slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'md-slide-out-right': {
					'0%': { transform: 'translateX(0)', opacity: '1' },
					'100%': { transform: 'translateX(100%)', opacity: '0' }
				},
				'md-slide-in-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'md-slide-out-left': {
					'0%': { transform: 'translateX(0)', opacity: '1' },
					'100%': { transform: 'translateX(-100%)', opacity: '0' }
				},
				'md-float': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'25%': { transform: 'translateY(-5px) rotate(1deg)' },
					'75%': { transform: 'translateY(5px) rotate(-1deg)' },
				},
				'md-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
				},
				'md-notification': {
					'0%, 100%': { transform: 'scale(1)' },
					'25%': { transform: 'scale(1.15)' },
					'50%': { transform: 'scale(0.95)' },
					'75%': { transform: 'scale(1.05)' },
				},
				'md-spotlight': {
					'0%, 100%': { backgroundPosition: '0% 0%' },
					'50%': { backgroundPosition: '100% 100%' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'slide': 'slide 25s linear infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'ripple': 'ripple 0.6s ease-out',
				'float': 'float 6s ease-in-out infinite',
				// Material Design animations
				'md-ripple': 'md-ripple 0.5s cubic-bezier(0.2, 0, 0, 1)',
				'md-fade-in': 'md-fade-in 0.3s cubic-bezier(0.2, 0, 0, 1)',
				'md-scale-up': 'md-scale-up 0.3s cubic-bezier(0.2, 0, 0, 1)',
				'md-fade-in-left': 'md-fade-in-left 0.3s cubic-bezier(0.2, 0, 0, 1)',
				'md-stagger-in': 'md-stagger-in 0.5s cubic-bezier(0.05, 0.7, 0.1, 1)',
				'md-rotate': 'md-rotate 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'md-slide-in-right': 'md-slide-in-right 0.3s cubic-bezier(0.2, 0, 0, 1)',
				'md-slide-out-right': 'md-slide-out-right 0.3s cubic-bezier(0.2, 0, 0, 1)',
				'md-slide-in-left': 'md-slide-in-left 0.3s cubic-bezier(0.2, 0, 0, 1)',
				'md-slide-out-left': 'md-slide-out-left 0.3s cubic-bezier(0.2, 0, 0, 1)',
				'md-float': 'md-float 6s ease-in-out infinite',
				'md-pulse': 'md-pulse 2s ease-in-out infinite',
				'md-notification': 'md-notification 0.8s cubic-bezier(0.2, 0, 0.2, 1)',
				'md-spotlight': 'md-spotlight 8s ease infinite'
			},
			boxShadow: {
				'elevation-1': 'var(--md-elevation-level1)',
				'elevation-2': 'var(--md-elevation-level2)',
				'elevation-3': 'var(--md-elevation-level3)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
