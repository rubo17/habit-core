export type HabitIconCategory = 'Fitness' | 'Salud' | 'Mente' | 'Nutrición' | 'Estilo de vida'

export interface HabitIconDef {
  name: string
  label: string
  category: HabitIconCategory
  svg: string // inner SVG HTML — supports path, circle, line, polyline, polygon
}

export const habitIcons: HabitIconDef[] = [
  // ── FITNESS ──────────────────────────────────────────────────────────────
  {
    name: 'activity',
    label: 'Actividad',
    category: 'Fitness',
    svg: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  },
  {
    name: 'bike',
    label: 'Bicicleta',
    category: 'Fitness',
    svg: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
  },
  {
    name: 'dumbbell',
    label: 'Pesas',
    category: 'Fitness',
    svg: '<path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 5.343a4 4 0 1 0-5.657 5.657l1.414-1.414a2 2 0 1 1 2.829-2.829z"/><path d="M5.343 18.657a4 4 0 1 0 5.657-5.657l-1.414 1.414a2 2 0 1 1-2.829 2.829z"/>',
  },
  {
    name: 'waves',
    label: 'Natación',
    category: 'Fitness',
    svg: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
  },
  {
    name: 'mountain',
    label: 'Senderismo',
    category: 'Fitness',
    svg: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/>',
  },
  {
    name: 'flame',
    label: 'Entrenamiento',
    category: 'Fitness',
    svg: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  },
  {
    name: 'zap',
    label: 'HIIT',
    category: 'Fitness',
    svg: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  },
  {
    name: 'footprints',
    label: 'Correr',
    category: 'Fitness',
    svg: '<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.5 2-4 4-4s4 1.5 4 4c.03 2.5-1 3.5-1 5.62V16"/><path d="M7 12v4"/><path d="M11 16v-2.38C11 11.5 12.97 10.5 13 8c.03-2.5 2-4 4-4s4 1.5 4 4c.03 2.5-1 3.5-1 5.62V16"/><path d="M14 12v4"/>',
  },
  {
    name: 'timer',
    label: 'Intervalos',
    category: 'Fitness',
    svg: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
  },
  {
    name: 'wind',
    label: 'Cardio',
    category: 'Fitness',
    svg: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  },
  {
    name: 'trophy',
    label: 'Deporte',
    category: 'Fitness',
    svg: '<line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1"/><path d="M8 22h8"/><path d="M7 9v8a5 5 0 0 0 10 0V9"/>',
  },
  {
    name: 'yoga',
    label: 'Yoga',
    category: 'Fitness',
    svg: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  },

  // ── SALUD ─────────────────────────────────────────────────────────────────
  {
    name: 'droplet',
    label: 'Agua',
    category: 'Salud',
    svg: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  },
  {
    name: 'moon',
    label: 'Dormir',
    category: 'Salud',
    svg: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  },
  {
    name: 'heart',
    label: 'Salud cardíaca',
    category: 'Salud',
    svg: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  },
  {
    name: 'pill',
    label: 'Medicación',
    category: 'Salud',
    svg: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
  },
  {
    name: 'eye',
    label: 'Visión',
    category: 'Salud',
    svg: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  },
  {
    name: 'thermometer',
    label: 'Temperatura',
    category: 'Salud',
    svg: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>',
  },
  {
    name: 'shield',
    label: 'Inmunidad',
    category: 'Salud',
    svg: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  },
  {
    name: 'sun',
    label: 'Vitamina D',
    category: 'Salud',
    svg: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  },
  {
    name: 'smile',
    label: 'Bienestar',
    category: 'Salud',
    svg: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
  },
  {
    name: 'no-smoking',
    label: 'Sin tabaco',
    category: 'Salud',
    svg: '<line x1="2" x2="22" y1="2" y2="22"/><path d="M12 12H2v4h10.34"/><path d="M22 12v4"/><path d="M7 12v4"/><path d="m16 8 2 4"/><path d="M17 8c0-2.76-2.69-5-6-5-1.5 0-2.87.5-3.9 1.3"/>',
  },

  // ── MENTE ─────────────────────────────────────────────────────────────────
  {
    name: 'book-open',
    label: 'Leer',
    category: 'Mente',
    svg: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  },
  {
    name: 'brain',
    label: 'Aprender',
    category: 'Mente',
    svg: '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.04-4.79A3 3 0 0 1 5 12.5a3 3 0 0 1 3-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.04-4.79A3 3 0 0 0 19 12.5a3 3 0 0 0-3-3A2.5 2.5 0 0 0 14.5 2Z"/>',
  },
  {
    name: 'headphones',
    label: 'Meditación',
    category: 'Mente',
    svg: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
  },
  {
    name: 'pen-line',
    label: 'Diario',
    category: 'Mente',
    svg: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  },
  {
    name: 'target',
    label: 'Enfoque',
    category: 'Mente',
    svg: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  },
  {
    name: 'puzzle',
    label: 'Juegos mentales',
    category: 'Mente',
    svg: '<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.677.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z"/>',
  },
  {
    name: 'music',
    label: 'Música',
    category: 'Mente',
    svg: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  },
  {
    name: 'palette',
    label: 'Arte',
    category: 'Mente',
    svg: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  },
  {
    name: 'lightbulb',
    label: 'Gratitud',
    category: 'Mente',
    svg: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  },
  {
    name: 'smartphone-off',
    label: 'Sin pantalla',
    category: 'Mente',
    svg: '<path d="M10.68 13.31a16 16 0 0 1 3.41 2.6l1.27-1.27a2 2 0 0 1 2.83 0l2.15 2.15a2 2 0 0 1 0 2.83l-2 2a2 2 0 0 1-2.83 0 15.9 15.9 0 0 1-6.16-3.87m-3.37-5.65a15.9 15.9 0 0 1-3.87-6.16 2 2 0 0 1 0-2.83l2-1.96a2 2 0 0 1 2.83 0l2.15 2.15a2 2 0 0 1 0 2.83l-1.27 1.27"/><line x1="2" x2="22" y1="2" y2="22"/>',
  },

  // ── NUTRICIÓN ─────────────────────────────────────────────────────────────
  {
    name: 'apple',
    label: 'Comer sano',
    category: 'Nutrición',
    svg: '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4 4 0 0 0 18 6h-2a2 2 0 0 1-2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 1-2 2H6a4 4 0 0 0-4 3.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c0 2-2 4-4 4"/>',
  },
  {
    name: 'salad',
    label: 'Ensalada',
    category: 'Nutrición',
    svg: '<path d="M7 21h10"/><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-3.19 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"/><path d="m13 12 4-4"/><path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"/>',
  },
  {
    name: 'droplets',
    label: 'Hidratación',
    category: 'Nutrición',
    svg: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
  },
  {
    name: 'ban',
    label: 'Sin azúcar',
    category: 'Nutrición',
    svg: '<circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/>',
  },
  {
    name: 'leaf',
    label: 'Vitaminas',
    category: 'Nutrición',
    svg: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  },
  {
    name: 'chef-hat',
    label: 'Cocinar',
    category: 'Nutrición',
    svg: '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 21h12"/>',
  },
  {
    name: 'clock',
    label: 'Ayuno',
    category: 'Nutrición',
    svg: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  },
  {
    name: 'utensils',
    label: 'Meal prep',
    category: 'Nutrición',
    svg: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  },
  {
    name: 'coffee',
    label: 'Café',
    category: 'Nutrición',
    svg: '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/>',
  },

  // ── ESTILO DE VIDA ────────────────────────────────────────────────────────
  {
    name: 'sunrise',
    label: 'Madrugar',
    category: 'Estilo de vida',
    svg: '<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>',
  },
  {
    name: 'stars',
    label: 'Dormir pronto',
    category: 'Estilo de vida',
    svg: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
  },
  {
    name: 'sparkles',
    label: 'Limpieza',
    category: 'Estilo de vida',
    svg: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
  },
  {
    name: 'sprout',
    label: 'Plantas',
    category: 'Estilo de vida',
    svg: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2 3.7-1.1.3-2.2.4-3.5.1C6.4 12.6 5 10.8 5 9a4 4 0 0 1 8 0c0 .5-.1.9-.2 1.3"/><path d="M14.1 6a7 7 0 0 1 1.1 7.1"/>',
  },
  {
    name: 'paw-print',
    label: 'Mascotas',
    category: 'Estilo de vida',
    svg: '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
  },
  {
    name: 'piggy-bank',
    label: 'Ahorro',
    category: 'Estilo de vida',
    svg: '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h0"/>',
  },
  {
    name: 'wine-off',
    label: 'Sin alcohol',
    category: 'Estilo de vida',
    svg: '<path d="M8 22h8"/><path d="M7 10h3m7 0h-1.343"/><path d="M12 15v7"/><path d="M7.2 7.2A6.4 6.4 0 0 0 7 10a5 5 0 0 0 6.708 4.708M14.72 8.8A6.4 6.4 0 0 0 15 10a5 5 0 0 0-1.603 3.55"/><path d="M5 2h12l-1.5 4.5"/><path d="m2 2 20 20"/>',
  },
  {
    name: 'users',
    label: 'Socializar',
    category: 'Estilo de vida',
    svg: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  },
  {
    name: 'walk',
    label: 'Caminar',
    category: 'Estilo de vida',
    svg: '<circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/>',
  },
]

export const habitIconMap: Record<string, HabitIconDef> = Object.fromEntries(
  habitIcons.map((icon) => [icon.name, icon]),
)

export const habitIconCategories: HabitIconCategory[] = [
  'Fitness',
  'Salud',
  'Mente',
  'Nutrición',
  'Estilo de vida',
]
