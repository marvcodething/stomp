'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import background from './background.png';
import mainSheet from './mainSpritemap.png';

const PhaserGame = () => {
  const gameRef = useRef(null);
  const currentRoute = useRef(null);
  const movement = useRef({ up: false, down: false, left: false, right: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

      // Set mobile-safe 100vh unit
      const setVh = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      };
      setVh();
      window.addEventListener('resize', setVh);
      return () => window.removeEventListener('resize', setVh);
    }
  }, []);

  const moveStart = (dir) => {
    movement.current[dir] = true;
  };

  const moveEnd = (dir) => {
    movement.current[dir] = false;
  };

  const enterHouse = () => {
    if (currentRoute.current) window.location.href = currentRoute.current;
  };

  useEffect(() => {
    if (gameRef.current) return;

    class MyGame extends Phaser.Scene {
      preload() {
        this.load.image('background', background.src);
        this.load.spritesheet("sheet", mainSheet.src, {
          frameWidth: 32,
          frameHeight: 32,
        });
      }

      create() {
        this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('sheet', { frames: [0, 1, 2, 3, 4, 5] }), frameRate: 20, repeat: -1 });
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('sheet', { frames: [0, 1, 2, 3, 4, 5] }), frameRate: 20, repeat: -1 });
        this.anims.create({ key: 'up', frames: this.anims.generateFrameNumbers('sheet', { frames: [6, 7, 8, 9] }), frameRate: 12, repeat: -1 });
        this.anims.create({ key: 'down', frames: this.anims.generateFrameNumbers('sheet', { frames: [10, 11, 12, 13] }), frameRate: 12, repeat: -1 });

        this.add.image(0, 0, 'background').setOrigin(0).setScale(1);
        this.player = this.add.sprite(50, 270, 'sheet', 10);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        this.houseZone = this.add.zone(60, 185, 30, 30);
        this.houseZone2 = this.add.zone(216, 105, 30, 30);
        this.houseZone3 = this.add.zone(466.545, 110, 30, 20);

        this.sign = this.add.zone(340, 100, 50, 40);
        this.physics.add.existing(this.sign, true);
        this.physics.add.collider(this.player, this.sign);
        this.signZone = this.add.zone(340, 140, 50, 60);

        this.water1 = this.add.zone(400, 350, 455, 80);
        this.physics.add.existing(this.water1, true);
        this.physics.add.collider(this.player, this.water1);

        this.water2 = this.add.zone(505, 280, 450, 80);
        this.physics.add.existing(this.water2, true);
        this.physics.add.collider(this.player, this.water2);

        this.physics.world.enable([this.houseZone, this.houseZone2, this.houseZone3, this.signZone]);
        [this.houseZone, this.houseZone2, this.houseZone3, this.signZone].forEach(zone => {
          zone.body.setAllowGravity(false);
          zone.body.moves = false;
        });

        const walls = [{ x: 60, y: 152 }, { x: 214, y: 75 }, { x: 466.545, y: 76 }];
        walls.forEach(({ x, y }) => {
          const wall = this.add.zone(x, y, 50, 50);
          this.physics.add.existing(wall, true);
          this.physics.add.collider(this.player, wall);
        });

        this.physics.add.overlap(this.player, this.houseZone, () => { currentRoute.current = '/house1'; });
        this.physics.add.overlap(this.player, this.houseZone2, () => { currentRoute.current = '/house2'; });
        this.physics.add.overlap(this.player, this.houseZone3, () => { currentRoute.current = '/house3'; });
        this.physics.add.overlap(this.player, this.signZone, () => { currentRoute.current = '/info'; });

        this.wasd = {
          up: this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            up: Phaser.Input.Keyboard.KeyCodes.UP,
          }),
          down: this.input.keyboard.addKeys({
            s: Phaser.Input.Keyboard.KeyCodes.S,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
          }),
          left: this.input.keyboard.addKeys({
            a: Phaser.Input.Keyboard.KeyCodes.A,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
          }),
          right: this.input.keyboard.addKeys({
            d: Phaser.Input.Keyboard.KeyCodes.D,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
          }),
        };

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      }

      update() {
        const { left, right, up, down } = this.wasd;
        const touch = movement.current;
        const player = this.player;
        const speed = 100;

        player.body.setVelocity(0);
        player.setFlipX(false);

        if (left.a.isDown || left.left.isDown || touch.left) {
          player.body.setVelocityX(-speed);
          player.play('left', true);
        } else if (right.d.isDown || right.right.isDown || touch.right) {
          player.body.setVelocityX(speed);
          player.setFlipX(true);
          player.play('right', true);
        } else if (up.w.isDown || up.up.isDown || touch.up) {
          player.body.setVelocityY(-speed);
          player.play('up', true);
        } else if (down.s.isDown || down.down.isDown || touch.down) {
          player.body.setVelocityY(speed);
          player.play('down', true);
        } else {
          player.setFrame(10);
        }

        if (currentRoute.current && Phaser.Input.Keyboard.JustDown(this.eKey)) {
          window.location.href = currentRoute.current;
        }
      }
    }

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: 512,
      height: isMobile ? 300 : 384,
      pixelArt: true,
      backgroundColor: '#000000',
      physics: {
        default: 'arcade',
        arcade: { debug: false },
      },
      scene: MyGame,
      parent: 'phaser-container',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [isMobile]);

  const btnStyle = {
    width: 60,
    height: 60,
    fontSize: 24,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#444',
    color: 'white',
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: 'calc(var(--vh, 1vh) * 100)',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: 'black',
    }}>
      <div id="phaser-container" style={{ width: '100%', height: '100%' }} />

      {!isMobile && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'black',
          fontFamily: 'sans-serif',
          fontSize: '16px',
          zIndex: 10,
          pointerEvents: 'none',
        }}>
          Press <b>E</b> to enter a house or interact
        </div>
      )}

      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 20,
        }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button
              onTouchStart={() => moveStart('up')}
              onTouchEnd={() => moveEnd('up')}
              style={btnStyle}
            >↑</button>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onTouchStart={() => moveStart('left')}
              onTouchEnd={() => moveEnd('left')}
              style={btnStyle}
            >←</button>
            <button
              onTouchStart={() => moveStart('down')}
              onTouchEnd={() => moveEnd('down')}
              style={btnStyle}
            >↓</button>
            <button
              onTouchStart={() => moveStart('right')}
              onTouchEnd={() => moveEnd('right')}
              style={btnStyle}
            >→</button>
          </div>
          <button
            onTouchStart={enterHouse}
            style={{ ...btnStyle, marginTop: '10px' }}
          >
            Enter
          </button>
        </div>
      )}
    </div>
  );
};

export default PhaserGame;
