export const drawGame = (ctx, state) => {
  // Draw background
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw grid lines
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  for (let i = 0; i < ctx.canvas.width; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ctx.canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < ctx.canvas.height; i += 40) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(ctx.canvas.width, i);
    ctx.stroke();
  }

  // Draw entities
  state.entities.forEach(entity => {
    if (entity.type === 'enemy') {
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.moveTo(entity.x, entity.y - 8);
      ctx.lineTo(entity.x + 8, entity.y + 8);
      ctx.lineTo(entity.x - 8, entity.y + 8);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(entity.x, entity.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Draw player
  ctx.fillStyle = '#4F46E5';
  ctx.beginPath();
  ctx.arc(state.playerPosition.x, state.playerPosition.y, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw player glow
  ctx.shadowColor = '#4F46E5';
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.arc(state.playerPosition.x, state.playerPosition.y, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;
};