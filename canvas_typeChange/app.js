let isColoring = false;
let isClearColoring = false;

function init() {
  colorChange();
  lineChange();
};

function canvasTypeFn($type) {
  switch ($type) {
    case 'draw': {
      canvas.on('mousedown', drawPc);
      canvas.on('mousemove', drawPc);
      canvas.on('mouseup', drawPc);
      canvas.on('mouseout', drawPc);
      canvas.on('touchstart', drawMo);
      canvas.on('touchend', drawMo);
      canvas.on('touchcancle', drawMo);
      canvas.on('touchmove', drawMo);
    }; break;
    case 'lineDraw': {
      console.log('switch lineDraw');
      canvas.on('mousedown', drawingPc);
      canvas.on('mousemove', drawingPc);
      canvas.on('mouseup', drawingPc);
      canvas.on('mouseup', drawingPc);
    }; break;
    case 'dragLineDraw': {
      console.log('dragLineDraw');
      $('.dot_container').show();
      dragdropable();
    }; break;
    case 'coloring': {
      isColoring = true;
      coloring();
    }; break;
  };
};

// 선긋기, 드래그 드랍
function dragdropable() {
  dragBox.each(function (e) {
    radius = $(this).width() / 2;
    objRadius = dragObj.width() / 2;

    $(this).attr('data-originalLeft', $(this).position().left);
    $(this).attr('data-originalTop', $(this).position().top);

    defaultX = $(this).attr('data-originalLeft');
    defaultY = $(this).attr('data-originalTop');

    startX[e] = ((Number(defaultX) + radius) + dragCon.offset().left) - canvas.offset().left;
    startY[e] = ((Number(defaultY) + radius) + dragCon.offset().top) - canvas.offset().top;

    originX[e] = $(this).find('.dragObj').offset().left;
    originY[e] = $(this).find('.dragObj').offset().top;
  });

  dragObj.draggable({
    start: function (e, ui) {
      stIdx = dragObj.index(this);
      otherObj = dragObj.not($(this));

      lineArr[stIdx] = 'start';

      draw();
    },
    drag: function (e, ui) {
      draw();
    },
    revert: function (e, ui) {
      if (e == false) {
        isRevert = false;
        return true;
      } else {
        isRevert = true;
      };
    },
    revertDuration: 10,
    stop: function (e, ui) {
      if ($(this).hasClass('return')) {
        $(this).removeClass('return');
        $(this).offset({
          top: originY[stIdx],
          left: originX[stIdx]
        });
      };
      draw();
    },
  });

  dropObj.droppable({
    drop: function (e, ui) {
      let drag = ui.draggable;

      dropX = $(this).find('.dropObj').offset().left;
      dropY = $(this).find('.dropObj').offset().top;

      drag.offset({
        top: dropY,
        left: dropX
      });

      for (let i = 0; i < otherObj.length; i++) {
        if (drag.hitTestObject(otherObj.eq(i))) {
          hittest(drag);
        } else {
          drag.draggable({
            revert: function (e, ui) {
              if (e == false) {
                hittest($(this));
              } else {
                isRevert = true;
              };
            },
          });
        };
      };
    },
  });
};

function draw() {
  ctx.clearRect(0, 0, canvas.width(), canvas.height());

  for (let i = 0; i < dragObj.length; i++) {
    endX = (dragObj.eq(i).offset().left + objRadius) - canvas.offset().left;
    endY = (dragObj.eq(i).offset().top + objRadius) - canvas.offset().top;

    if (lineArr[i] == 'start') {
      ctx.beginPath();
      ctx.moveTo(startX[i], startY[i]);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };
  };
};

function hittest($obj) {
  isRevert = false;
  $obj.addClass('return');
  $obj.draggable({
    revert: true,
    revertDuration: 10
  });
};
// 선긋기 END

// coloring
const imgArr = [
  './img/drawing_line/line_1.png',
  './img/drawing_line/line_2.png',
  './img/drawing_line/line_3.png',
];
let imgNum = Math.round(Math.random() * (imgArr.length - 1));

function coloring() {
  div.prepend('<canvas id="canvas2"></canvas>');
  canvas2 = $('#canvas2');
  ctx2 = canvas2[0].getContext('2d');

  canvas.css({
    position: 'relative',
    zIndex: 100,
  })
  canvas2.css({
    position: 'absolute', top: 0, left: 0,
    zIndex: 200,
  });
  canvas2[0].width = div.width();
  canvas2[0].height = div.height();

  let bgImage = new Image();
  bgImage.src = imgArr[imgNum];

  bgImage.onload = function (e) {
    let maxWidth = canvas.width();
    let maxHeigth = canvas.height();
    let width = this.width;
    let height = this.height;
    let ratio = 0;
    let x = maxWidth / 2;

    ratio = maxHeigth / height;
    width = width * ratio;
    height = maxHeigth;
    x = x - width / 2;

    ctx2.drawImage(bgImage, x, 0, width, maxHeigth);
  };

  canvas2.on('mousedown', drawPc);
  canvas2.on('mousemove', drawPc);
  canvas2.on('mouseup', drawPc);
  canvas2.on('mouseout', drawPc);
  canvas2.on('touchstart', drawMo);
  canvas2.on('touchend', drawMo);
  canvas2.on('touchcancle', drawMo);
  canvas2.on('touchmove', drawMo);
};

// pc draw 이벤트 함수
function drawPc(e) {
  switch (e.type) {
    case "mousedown": {
      drawble = true;
      if (mode === 'brush') {
        ctx.beginPath();
        ctx.moveTo(getPosition(e).X, getPosition(e).Y);
        ctx.lineTo(getPosition(e).X, getPosition(e).Y);
        ctx.stroke();
      } else {
        ctx.clearRect(getPosition(e).X, getPosition(e).Y, ctx.lineWidth, ctx.lineWidth);
      };
    } break;
    case "mousemove": {
      if (drawble) {
        if (mode === 'brush') {
          ctx.lineTo(getPosition(e).X, getPosition(e).Y);
          ctx.stroke();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        } else {
          ctx.clearRect(getPosition(e).X, getPosition(e).Y, ctx.lineWidth, ctx.lineWidth)
        };
      };
    } break;
    case "mouseup":
    case "mouseout": {
      drawble = false;
      ctx.closePath();
    } break;
  };
};

// 직선그리기
function drawingPc(e) {
  switch (e.type) {
    case "mousedown": {
      backup = ctx.getImageData(0, 0, canvas.width(), canvas.height());
      drawble = true;

      // 8은 margin 값
      let scrollTop = canvas.offset().top + window.scrollY - 8;
      sx = e.clientX - canvas.offset().left;
      sy = e.clientY - canvas.offset().top + scrollTop;
    };
      break;

    case "mouseover":
    case "mousemove": {
      if (drawble) {
        ctx.putImageData(backup, 0, 0);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(getPosition(e).X, getPosition(e).Y);
        ctx.stroke();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      };
    };
      break;

    case "mouseup":
    case "mouseout": {
      drawble = false;
    };
      break;
    case "mouseover": {
      drawble = true;
    };
      break;
  };
};

// mobile draw 이벤트 함수
function drawMo(e) {
  switch (e.type) {
    case "touchstart": {
      drawble = true;

      if (mode === 'brush') {
        ctx.beginPath();
        ctx.moveTo(getMobilePosition(e).X, getMobilePosition(e).Y);
        ctx.stroke();
      } else {
        ctx.clearRect(getMobilePosition(e).X, getMobilePosition(e).Y, ctx.lineWidth, ctx.lineWidth);
      };
    } break;
    case "touchmove": {
      if (drawble) {
        e.preventDefault();

        if (mode === 'brush') {
          ctx.lineTo(getMobilePosition(e).X, getMobilePosition(e).Y);
          ctx.stroke();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        } else {
          ctx.clearRect(getMobilePosition(e).X, getMobilePosition(e).Y, ctx.lineWidth, ctx.lineWidth);
        };
      }
    } break;
    case "touchend":
    case "touchcancel": {
      drawble = false;
      ctx.closePath();
    } break;
  };
};

function getPosition(e) {
  let x = e.pageX - canvas.offset().left;
  let y = e.pageY - canvas.offset().top;
  return { X: x, Y: y };
};

function getMobilePosition(e) {
  var x = e.originalEvent.changedTouches[0].pageX - canvas.offset().left;
  var y = e.originalEvent.changedTouches[0].pageY - canvas.offset().top;
  return { X: x, Y: y };
};

function colorChange() {
  $color.on('click', function () {
    chColor = $(this).css('background-color');
    ctx.strokeStyle = chColor;

    $colorPicker.attr('value', rgb2hex(chColor));
    localStorage.setItem('color', rgb2hex(chColor));
  });

  $colorPicker.on('change keyup paste', function () {
    inputColor = $(this).val();
    ctx.strokeStyle = inputColor;
    localStorage.setItem('color', rgb2hex(inputColor));
  });

  let saveColor = rgb2hex(localStorage.getItem('color'));

  ctx.strokeStyle = saveColor;
  $colorPicker.attr('value', saveColor);
};

function lineChange(e) {
  $range.on('input', function (e) {
    let size = e.target.value;
    ctx.lineWidth = size;
    localStorage.setItem('lineWeight', size);
  });

  if (localStorage.getItem('lineWeight') == null) {
    localStorage.setItem('lineWeight', 5);
    let defultLine = localStorage.getItem('lineWeight');
    ctx.lineWidth = defultLine;
  };
};

// 화면 조절 함수
function canvasResize() {
  canvas[0].width = div.width();
  canvas[0].height = div.height();

  ctx.lineWidth = "5";
};

function saveImg() {
  let saveData = localStorage.getItem('saveCanvas');

  let img = new Image;
  img.src = saveData;
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
};

function rgb2hex($val) {
  if ($val == null) { $val = '#000000'; };

  if ($val.indexOf("rgb") == -1) {
    return $val;
  } else {
    $val = $val.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex($val[1]) + hex($val[2]) + hex($val[3]);
  };
};

function reset() {
  canvasResize();

  ctx.clearRect(0, 0, canvas.width(), canvas.height())
  $dashLine.removeClass('active');
  ctx.setLineDash([]);

  ctx.strokeStyle = rgb2hex(localStorage.getItem('color'));
  ctx.lineWidth = localStorage.getItem('lineWeight');

  lineArr = [];

  dragObj.each(function (e) {
    $(this).offset({
      top: originY[e],
      left: originX[e]
    });
  });

  if (isColoring) {
    isClearColoring = true;
    coloring();
  };
};

function buttonEvent() {
  $brush.on('click', function () {
    $(this).addClass('active');
    $erase.removeClass('active');
    mode = 'brush';
  });

  $erase.on('click', function () {
    $(this).addClass('active');
    $brush.removeClass('active');
    mode = 'erase';
  });

  $dashLine.on('click', function (e) {
    $(this).toggleClass('active');

    if ($dashLine.hasClass('active')) {
      ctx.setLineDash([10, 20]);
    } else {
      ctx.setLineDash([]);
    }
  });
  $save.on('click', function () {
    localStorage.setItem('saveCanvas', canvas[0].toDataURL());
  });
  $getBack.on('click', saveImg)
  $url.on('click', function () {
    console.log(canvas[0].toDataURL());
    $url.append('<textarea class="hide">' + canvas[0].toDataURL() + '</textarea>');

    $('.hide').select();
    let copy = document.execCommand('copy');

    $('.hide').remove();
  });
  $picture.on('click', function () {
    let link = document.createElement('a');

    link.href = canvas[0].toDataURL('image/png');
    link.download = 'image.png';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  });
  $delete.on('click', function () {
    reset();
  });
}; // button click event end

// hit test fn
$.fn.hitTestObject = function (obj) {
  var bounds = this.offset();
  bounds.right = bounds.left + this.outerWidth();
  bounds.bottom = bounds.top + this.outerHeight();
  var compare = obj.offset();
  compare.right = compare.left + obj.outerWidth();
  compare.bottom = compare.top + obj.outerHeight();
  return (!(compare.right < bounds.left || compare.left > bounds.right || compare.bottom < bounds.top || compare.top > bounds.bottom));
};
