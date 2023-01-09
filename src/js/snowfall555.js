function Snowflakes(a) {
  //функція конструктор об'єкта сніжинка
  this.anime = function (ob) {
    for (var i = 0; i < ob._el.length; i++) {
      if (!ob._el[i]) continue;
      ob._el[i].x += ob.param.speed + Math.random();
      ob._el[i].style.top = ob._el[i].x + 'px';
      if (ob.param.drif)
        ob._el[i].style.left =
          parseInt(ob._el[i].style.left) +
          (Math.random() > 0.5 ? 1 : -1) +
          'px';
      if (ob._el[i].x > ob.height) {
        if (ob.param.loop) ob._el[i].x = 0;
        else {
          document.body.removeChild(ob._el[i]);
          ob._el.splice(i, 1);
        }
      }
    }
    if (ob._el.length > 0) setTimeout(ob.anime, 50, ob);
  };
  this.param = {
    count: 100,
    color: 'blue',
    size: 14,
    loop: false,
    drif: false,
    speed: 1,
  };
  this.width = document.body.clientWidth;
  this.height = document.body.clientHeight;
  for (b in a) if (b in this.param) this.param[b] = a[b];
  this._el = [];
  for (var i = 0; i < this.param.count; i++) {
    this._el[i] = document.createElement('div');
    this._el[i].x = 0 - Math.random() * this.height;
    this._el[i].innerText = '*';
    this._el[i].style.position = 'fixed';
    this._el[i].style.top = this._el[i].x + 'px';
    this._el[i].style.left = parseInt(Math.random() * this.width) + 'px';
    this._el[i].style.color = this.param.color;
    this._el[i].style.fontSize = this.param.size;
    document.body.appendChild(this._el[i]);
  }
  this.anime(this);
}

var sn = new Snowflakes({ count: 100, color: 'blue', size: 18 }); //створюємо обєкт сніжинки

function SnowFalls(ob) {
  this.param = {
    count: 100,
    color: ['blue'],
    minSize: 12,
    maxSize: 44,
    letter: '*',
    speed: 1,
  };
  for (a in ob) if (a in this.param) this.param[a] = ob[a];
  this.param.color = [...this.param.color];
  this.param.letter = [...this.param.letter];
  this.width = Math.max(document.body.clientWidth, innerWidth);
  this.height = Math.max(document.body.clientHeight, innerHeight);
  this.el = [];
  for (var i = 0; i < this.param.count; i++) {
    this.el[i] = document.createElement('div');
    this.el[i].innerHTML =
      this.param.letter[parseInt(Math.random() * this.param.letter.length)];
    this.el[i].style.position = 'fixed';
    this.el[i].style.top = '-50px';
    this.el[i].style.left = 0;
    this.el[i].top = 0 - Math.random() * this.height;
    this.el[i].crds = 0;
    this.el[i].left_radius = Math.random() * (15 - 5) + 5; //радіус обертання px
    this.el[i].left_sped = 0.00001 + Math.random() / 55; //швидкість обертання сніжинки
    this.el[i].left_x = parseInt(Math.random() * this.width);
    this.el[i].left = 0;
    this.el[i].style.color =
      this.param.color[parseInt(this.param.color.length * Math.random())];
    this.el[i].style.fontSize =
      parseInt(
        Math.random() * (this.param.maxSize - this.param.minSize) +
          this.param.minSize
      ) + 'px';
    this.el[i].style.opacity = Math.random();
    document.body.appendChild(this.el[i]);
  }
  this.animation = function () {
    for (var i = 0, l = this.el.length; i < l; i++) {
      this.el[i].crds += this.el[i].left_sped;
      this.el[i].left =
        this.el[i].left_x + this.el[i].left_radius * Math.sin(this.el[i].crds);
      this.el[i].top += this.param.speed;
      if (this.el[i].top > this.height) {
        this.el[i].top = -50;
        this.el[i].left = parseInt(Math.random() * this.width);
      }
      this.el[i].style.top = this.el[i].top + 'px';
      this.el[i].style.left = this.el[i].left + 'px';
      this.el[i].left = Math.random() * this.width;
    }
    requestAnimationFrame(this.animation.bind(this)); //або setTimeout(this.animation.bind(this),25);
  };
  this.animation();
}

new SnowFalls({ color: ['blue', 'white'] });

function Snow(color, count, minSize, maxSize) {
  count = count || parseInt(Math.random() * (500 - 75) + 75);
  color = color || 'white';
  minSize = minSize || 2;
  maxSize = maxSize || 10;
  this.width = document.body.clientWidth;
  this.height = document.body.clientHeight;
  this.el = new Array();
  for (var i = 0, w; i < count; i++) {
    this.el[i] = document.createElement('div');
    this.el[i].style.position = 'fixed';
    this.el[i].style.backgroundColor = color;
    this.el[i].style.opacity = 1 - Math.random();
    w = parseInt(Math.random() * (maxSize - minSize) + minSize);
    this.el[i].style.width = w + 'px';
    this.el[i].style.height = w + 'px';
    this.el[i].style.borderRadius = w + 'px';
    this.el[i].style.left = 0;
    this.el[i].style.top = -10;
    this.el[i].x = 0 - Math.random() * this.height;
    this.el[i].y = Math.random() * this.width;
    this.el[i].speed = 1 + Math.random() * 3;
    this.el[i].direct = Math.random();
    this.el[i].directCount = parseInt(Math.random() * (this.height / 2));
    document.body.appendChild(this.el[i]);
  }
  this.anime();
}

Snow.prototype.anime = function () {
  for (var i = 0; i < this.el.length; i++) {
    this.el[i].x += this.el[i].speed;
    this.el[i].directCount--;
    if (this.el[i].directCount < 0) {
      this.el[i].directCount = Math.random() * this.height;
      this.el[i].direct = Math.random();
    }
    this.el[i].y =
      this.el[i].direct < 0.5 ? this.el[i].y - 1 : this.el[i].y + 1;
    if (this.el[i].x > this.height + 20) {
      this.el[i].x = -20;
      this.el[i].y = Math.random() * this.width;
    }
    this.el[i].style.top = this.el[i].x + 'px';
    this.el[i].style.left = this.el[i].y + 'px';
  }
  requestAnimationFrame(this.anime.bind(this)); //setTimeout('Snow.anime();', 50);
};

var s = new Snow('#8ec0f9');

function SnowCanvas(ob) {
  this.canvas = ob.canvas;
  this.ctx = this.canvas.getContext('2d');
  this.param = {
    count: parseInt(this.canvas.width * Math.random()),
    color: ['#9FCDFA'],
    backgroundColor: '#3d3d3d',
    minSize: 8,
    maxSize: 24,
    letter: '*',
    speed: 1,
  };
  this.snow = [];
  for (var i = 0; i < this.param.count; i++) {
    this.snow[i] = {};
    this.snow[i].x = Math.random() * this.canvas.width;
    this.snow[i].left = Math.random() > 0.5;
    this.snow[i].leftIndex = Math.random();
    this.snow[i].leftCount = parseInt(Math.random() * 25);
    this.snow[i].leftSpeed = Math.random() / 4;
    this.snow[i].y = 0 - this.canvas.height * Math.random();
    this.snow[i].size = parseInt(
      Math.random() * (this.param.maxSize - this.param.minSize) +
        this.param.minSize
    );
    this.snow[i].color =
      this.param.color[parseInt(Math.random() * this.param.color.length)];
  }
  this.animation = function () {
    if (this.img)
      this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    else {
      this.ctx.fillStyle = this.param.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    for (var i = 0; i < this.snow.length; i++) {
      this.ctx.font = this.snow[i].size + 'px Arial';
      this.ctx.fillStyle = this.snow[i].color;
      this.ctx.fillText('*', this.snow[i].x, this.snow[i].y);
      this.snow[i].x += this.snow[i].left
        ? this.snow[i].leftSpeed
        : -this.snow[i].leftSpeed;
      this.snow[i].leftIndex++;
      if (this.snow[i].leftIndex > this.snow[i].leftCount) {
        this.snow[i].left = !this.snow[i].left;
        this.snow[i].leftIndex = 0;
        this.snow[i].leftCount = parseInt(Math.random() * (65 + 35) - 35);
      }
      this.snow[i].y++;
      if (this.snow[i].y > this.canvas.height) {
        this.snow[i].x = Math.random() * this.canvas.width;
        this.snow[i].y = -5;
      }
    }
    requestAnimationFrame(this.animation.bind(this));
  };
  if (ob.img) {
    this.img = document.createElement('img');
    this.img.onload = this.animation.bind(this);
    this.img.src = ob.img;
  } else this.animation();
}

new SnowCanvas({
  canvas: document.getElementById('canva'),
  img: '/_images/yalynka.jpg',
});

var SnowCanvasBody = {
  resize: function () {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
  },
  init: function (a) {
    this.parameters = {
      count: parseInt(Math.random() * screen.width),
      color: ['#98d8f7', '#76c0ec'],
      opacity: 0.8,
      speed: 1.2,
      radiusMin: 2,
      radiusMax: 5,
    };
    for (var b in a) if (b in this.parameters) this.parameters[b] = a[b];
    this.canvas = document.createElement('canvas');
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = 0;
    this.canvas.style.left = 0;
    this.canvas.style.right = 0;
    this.canvas.style.bottom = 0;
    this.canvas.style.opacity = this.parameters.opacity;
    this.canvas.style.zIndex = 999;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
    this.snow = [];
    for (var i = 0; i < this.parameters.count; i++) {
      this.snow[i] = {};
      this.snow[i].x = Math.random() * this.canvas.width;
      this.snow[i].y = 0 - Math.random() * this.canvas.height;
      this.snow[i].r =
        Math.random() *
          (this.parameters.radiusMax - this.parameters.radiusMin) +
        this.parameters.radiusMin;
      this.snow[i].color =
        this.parameters.color[
          parseInt(this.parameters.color.length * Math.random())
        ];
    }
    this.repaint();
  },
  show: function (a) {
    this.init(a);
  },
  repaint: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0, l = this.snow.length; i < l; i++) {
      this.snow[i].y += this.parameters.speed;
      this.ctx.beginPath();
      this.ctx.fillStyle = this.snow[i].color;
      this.ctx.arc(
        this.snow[i].x,
        this.snow[i].y,
        this.snow[i].r,
        2 * Math.PI,
        false
      );
      this.ctx.fill();
      if (this.snow[i].y > this.canvas.height) {
        this.snow[i].y = 0 - Math.random() * this.canvas.height;
        this.snow[i].x = Math.random() * this.canvas.width;
      }
    }
    requestAnimationFrame(this.repaint.bind(this));
  },
};

SnowCanvasBody.show({ count: 100 });
