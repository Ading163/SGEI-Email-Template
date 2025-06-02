tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#165DFF',
        secondary: '#36D399',
        accent: '#FF9F43',
        neutral: '#F8FAFC',
        dark: '#1E293B'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    }
  }
}
