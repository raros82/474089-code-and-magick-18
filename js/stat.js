'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var DIAGRAM_STARTING_POINT = 245;
var DIAGRAM_MAX_HEIGHT = -150;
var DIAGRAM_X_SHIFT = 140;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP + FONT_GAP);

  var maxResult = 0;

  for (var t = 0; t < times.length; t++) {
    var currentResult = Math.round(times[t]);
    if (currentResult > maxResult) {
      maxResult = currentResult;
    }
  }
  for (var i = 0; i < names.length; i++) {
    var currentHeight = Math.round(times[i]) * DIAGRAM_MAX_HEIGHT / maxResult;
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], DIAGRAM_X_SHIFT + (BAR_WIDTH + BAR_GAP) * i, DIAGRAM_STARTING_POINT + GAP);
    ctx.fillText(String(Math.round(times[i])), DIAGRAM_X_SHIFT + (BAR_WIDTH + BAR_GAP) * i, DIAGRAM_STARTING_POINT + currentHeight - FONT_GAP);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, 100%, ' + 100 * Math.random() + '%)';
    }
    ctx.fillRect(DIAGRAM_X_SHIFT + (BAR_WIDTH + BAR_GAP) * i, DIAGRAM_STARTING_POINT, BAR_WIDTH, currentHeight);
  }
};

