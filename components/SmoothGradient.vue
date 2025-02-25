<script setup lang="ts">
/**
 * 1) Define your color keyframes
 *    fraction: fraction of the 24-hour cycle
 *    h, s, l: HSL color components
 *
 *    For example:
 *    fraction = 0.0 -> midnight
 *    fraction = 0.25 -> 6 AM
 *    fraction = 0.5 -> noon
 *    fraction = 0.75 -> 6 PM
 *    fraction = 1.0 -> midnight again
 */
const keyframes = [
  { fraction: 0.0,  h: 230, s: 30, l: 10 }, // midnight
  { fraction: 0.25, h: 210, s: 50, l: 50 }, // 6 AM
  { fraction: 0.5,  h: 190, s: 80, l: 60 }, // noon
  { fraction: 0.75, h: 30,  s: 70, l: 40 }, // 6 PM
  { fraction: 1.0,  h: 230, s: 30, l: 10 }, // midnight again
];

/**
 * 2) Use VueUse's useNow() to get a reactive Date
 *    By default, it updates every second.
 */
const now = useNow({interval: 500});

/**
 * 3) Calculate the fraction of the day (0 to 1)
 *    e.g., 0 = midnight, 0.5 = noon, 0.75 = 6 PM, etc.
 */
const dayFraction = computed(() => {
  const date = now.value;
  const seconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  return seconds / 86400; // 24 * 3600
});

/**
 * 4) Interpolate between keyframes to get a continuous HSL color
 */
function interpolateColor(f, kf1, kf2) {
  // fraction of the segment
  const localFrac = (f - kf1.fraction) / (kf2.fraction - kf1.fraction);
  const lerp = (start, end) => start + (end - start) * localFrac;
  return {
    h: lerp(kf1.h, kf2.h),
    s: lerp(kf1.s, kf2.s),
    l: lerp(kf1.l, kf2.l),
  };
}

/**
 * 5) Find which keyframe pair we are in, then interpolate
 */
function getColorForFraction(f) {
  // If fraction is exactly 1, loop back to 0
  if (f >= 1) f = f % 1;
  for (let i = 0; i < keyframes.length - 1; i++) {
    const kf1 = keyframes[i];
    const kf2 = keyframes[i + 1];
    if (f >= kf1.fraction && f <= kf2.fraction) {
      return interpolateColor(f, kf1, kf2);
    }
  }
  // fallback (shouldn’t happen if keyframes cover [0,1])
  return keyframes[keyframes.length - 1];
}

/**
 * 6) Compute the current color, then create a second color
 *    with a small hue offset to form a gradient
 */
const currentColor = computed(() => getColorForFraction(dayFraction.value));
const secondColor = computed(() => {
  // offset hue by 40 degrees, keep saturation & lightness
  return {
    h: (currentColor.value.h + 40) % 360,
    s: currentColor.value.s,
    l: currentColor.value.l,
  };
});

/**
 * 7) Convert HSL objects to a CSS gradient string
 */
function hslToString({ h, s, l }) {
  return `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
}

// We'll apply a slight transition so the gradient glides gently as time updates
const gradientStyle = computed(() => {
  const c1 = hslToString(currentColor.value);
  const c2 = hslToString(secondColor.value);
  return {
    background: `linear-gradient(to right, ${c1}, ${c2})`,
    transition: "background 1s linear",
  };
});
</script>

<template>
  <!--
    8) Use gradientStyle as a background for a full-page div.
    Then layer your clock or other elements on top.
  -->
  <div :style="gradientStyle" class="absolute inset-0 -z-[1]"></div>
</template>
