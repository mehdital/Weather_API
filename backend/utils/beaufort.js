const SCALE = [
    { max: 1,  name: 'Calme' },
    { max: 5,  name: 'Très légère brise' },
    { max: 11, name: 'Brise légère' },
    { max: 19, name: 'Petite brise' },
    { max: 28, name: 'Jolie brise' },
    { max: 38, name: 'Bonne brise' },
    { max: 49, name: 'Vent frais' },
    { max: 61, name: 'Grand frais' },
    { max: 74, name: 'Coup de vent' },
    { max: 88, name: 'Fort coup de vent' },
    { max: 102, name: 'Tempête' },
    { max: 117, name: 'Violente tempête' },
    { max: Infinity, name: 'Ouragan' }
  ];
  
  export function convertWindToBeaufort(speedKmh) {
    const idx = SCALE.findIndex(({ max }) => speedKmh <= max);
    return { beaufort: idx, description: SCALE[idx].name };
  }
  