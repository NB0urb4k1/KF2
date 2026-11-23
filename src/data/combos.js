// Combos de una sola partida: logros que caen a la vez al completar el mismo
// mapa y modo. Solo se agrupan los que de verdad se solapan:
//
//   - "Difícil o superior": se cumple también al completar en Infernal.
//   - Logros que se desbloquean al terminar el mapa (por ejemplo, derrotar al
//     jefe), así que cualquier partida que complete el mapa los otorga.
//
// OJO: las escaleras Normal -> Difícil -> Suicida -> Infernal NO se acumulan en
// Killing Floor 2. Cada dificultad exige su propia partida, así que esos logros
// no se agrupan aquí (ni el de clase, ni el de "Gana cualquier partida").
//
// `bonusIds` son logros opcionales de la misma partida: coleccionables,
// destruir objetos del mapa, etc. No cuentan para el progreso del combo.
//
// Los ids son los internal_key de Steam; los textos y porcentajes visibles
// llegan de la API en cada carga.

export const COMBOS = [
  {
    id: 'manicomio-ashwood',
    map: 'Manicomio de Ashwood',
    mode: 'Supervivencia',
    coreIds: [25606, 25607],
    bonusIds: [25608],
  },
  {
    id: 'manicomio-objetivo',
    map: 'Manicomio',
    mode: 'Objetivo',
    coreIds: [25613, 25614],
  },
  {
    id: 'bombardeado-objetivo',
    map: 'Bombardeado',
    mode: 'Objetivo',
    coreIds: [25609, 25610],
  },
  {
    id: 'laboratorio-biotico-objetivo',
    map: 'Laboratorio Biótico',
    mode: 'Objetivo',
    coreIds: [25611, 25612],
  },
  {
    id: 'biolapso',
    map: 'Biolapso',
    mode: 'Supervivencia',
    // 25616 es "Derrota a La matriarca", que cae al completar el mapa.
    coreIds: [25616, 25617, 25618],
    bonusIds: [25619],
  },
  {
    id: 'desolacion',
    map: 'Desolación',
    mode: 'Supervivencia',
    coreIds: [25620, 25621],
    bonusIds: [25622],
  },
  {
    id: 'puesto-hellmark',
    map: 'Puesto Hellmark',
    mode: 'Supervivencia',
    coreIds: [25623, 25624],
    bonusIds: [25625],
  },
  {
    id: 'eliseo',
    map: 'Elíseo',
    mode: 'Supervivencia',
    coreIds: [25626, 25627],
  },
  {
    id: 'distopia-2029',
    map: 'Distopía 2029',
    mode: 'Supervivencia',
    coreIds: [25630, 25631],
    bonusIds: [25856],
  },
  {
    id: 'base-lunar',
    map: 'Base lunar',
    mode: 'Supervivencia',
    coreIds: [25857, 25858],
    bonusIds: [25859],
  },
  {
    id: 'fuerte-del-mas-alla',
    map: 'Fuerte del más allá',
    mode: 'Supervivencia',
    coreIds: [25860, 25861],
    bonusIds: [25862],
  },
  {
    id: 'caserio-del-carillon',
    map: 'Caserío del carillón',
    mode: 'Supervivencia',
    coreIds: [25863, 25864],
    bonusIds: [25865],
  },
  {
    id: 'plataforma-petrolifera',
    map: 'Plataforma petrolífera',
    mode: 'Supervivencia',
    coreIds: [25866, 25867],
    bonusIds: [25868],
  },
  {
    id: 'ciudad-de-barmwich',
    map: 'Ciudad de Barmwich',
    mode: 'Supervivencia',
    coreIds: [25869, 25870],
    bonusIds: [25871],
  },
  {
    id: 'colision',
    map: 'Colisión',
    mode: 'Supervivencia',
    coreIds: [25872, 25873],
    bonusIds: [25874],
  },
  {
    id: 'subduccion',
    map: 'Subducción',
    mode: 'Supervivencia',
    coreIds: [25875, 25876],
    bonusIds: [25877],
  },
  {
    id: 'castillo-volter',
    map: 'Castillo Volter',
    mode: 'Supervivencia',
    coreIds: [25878, 25879],
    bonusIds: [25880],
  },
]
