var smoke = new Image();
		smoke.src = 'https://s4.postimg.org/atxdou6u1/smoke.png';

		$.fn.emitter = function(opts){
		  var particles = [];
		  var canvases = [];

		  var particle = function(canvas){
		    var x, y, size, speedX, speedY, opacity;
		    reset();
		    
		    this.update = function(){
		      if(opacity > 0){
		        opacity -= (Math.random() / opts.speed.fade);
		      }

		      if(opacity <= 0){
		        reset();
		      }
		      
		      speedX -= Math.random() / opts.speed.acceleration;
		      speedY -= Math.random() / opts.speed.acceleration;
		      x += speedX;
		      y += speedY;
		      size += Math.random();
		      drawParticle(x, y, size, opacity);
		    };

		    function drawParticle(x, y, size, opacity){
		      canvas.globalAlpha = opacity;
		      canvas.drawImage(smoke, 0, 0, opts.size, opts.size, x, y, size, 45);
		    }

		    function reset(){
		      x = opts.x;
		      y = opts.y;
		      size = 10;
		      speedX = Math.random() * opts.speed.x;
		      speedY = Math.random() * opts.speed.y;
		      opacity = Math.random();
		    }
		  };

		  var canvas = function(el){
		    var canvas = el[0].getContext('2d');

		    canvas.width = el.width();
		    canvas.height = el.height();

		    for(var c = 0; c < opts.particles; c++){
		      particles.push(new particle(canvas));
		    }

		    this.clear = function(){
		      canvas.clearRect(0, 0, canvas.width, canvas.height);
		    };
		  };

		  $(this).each(function(){
		    canvases.push(new canvas($(this)));
		  });

		  function render(){
		    canvases.forEach(function(canvas){
		      canvas.clear();
		    });

		    particles.forEach(function(particle){
		      particle.update();
		    });
		    
		    window.requestAnimationFrame(render);
		  }

		  return {
		    render: render
		  }
		};

		$('canvas').emitter({
		  x: -50,
		  y: 10,
		  size: 70,
		  particles: 5,
		  speed: {
		    x: 3,
		    y: 0,
		    fade: 150,
		    acceleration: 500
		  }
		}).render();