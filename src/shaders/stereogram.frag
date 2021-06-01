precision mediump float;

uniform sampler2D uTileTexture;
uniform sampler2D uHeightmapTexture;

uniform float uDepthFactor;

const int uStripesCount = 16;

varying vec2 vPosition;

float heightmap(const vec2 position) {
    return uDepthFactor * (1.0 - texture2D(uHeightmapTexture, position * vec2(1,-1) + vec2(0,1)).r);
}

vec2 originalPosition(vec2 position) {
    position *= float(uStripesCount);
    for (int i = 0; i < uStripesCount + 8; i++) {
        if (position.x >= 1.0) {
            position.x -= 1.0 - heightmap(position / float(uStripesCount)) * 0.45;
        }
    }
    position.y = fract(position.y);
    return position;
}

void main(void) {
    vec2 position = originalPosition(vPosition);

    vec3 color = texture2D(uTileTexture, position).rgb;
    gl_FragColor = vec4(color, 1);
}