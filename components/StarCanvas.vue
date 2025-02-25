<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement>();

const createStars = (width: number, height: number) => {
  let stars = [];
  for (let i = 0; i < 250; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.1 + 0.2,
    });
  }
  return stars;
};

const drawStars = (ctx: CanvasRenderingContext2D, stars: any[], width: number, height: number) => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#870021";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.x += star.speed;
    star.y += star.speed;
    if (star.y > height) star.y = 0;
    if (star.x > width) star.x = 0;
  });
};

onMounted(() => {
  const canvas = canvasRef.value;
  const ctx = canvas!.getContext("2d");
  canvas!.width = window.innerWidth;
  canvas!.height = window.innerHeight;

  const stars = createStars(canvas!.width, canvas!.height);

  const animate = () => {
    drawStars(ctx!, stars, canvas!.width, canvas!.height);
    requestAnimationFrame(animate);
  };
  animate();
});
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 -z-[1]"/>
</template>
