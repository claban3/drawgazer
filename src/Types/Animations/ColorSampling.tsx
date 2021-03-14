import { generateContrastColors } from '@adobe/leonardo-contrast-colors';

export function generateColorSpectrum(baseColor: string) {
    let contrastColors = generateContrastColors({ 
        colorKeys: [baseColor], 
        base: baseColor, 
        ratios: [1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6], 
        colorspace: "RGB"
    });

    return contrastColors;
}