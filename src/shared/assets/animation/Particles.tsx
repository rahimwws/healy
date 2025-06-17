import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Canvas, Circle } from '@shopify/react-native-skia';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  cancelAnimation,
} from 'react-native-reanimated';
import { Typography } from '@/shared/ui';
import { View } from 'react-native';

const NUM_PARTICLES = 150;
const PARTICLE_RADIUS = 1.5;
const CANVAS_SIZE = 300;
const MAX_RADIUS = 120;
const RING_RADIUS = 100;
const RING_THICKNESS = 20;

const CIRCLE_RADIUS = 6;
const ROTATION_SPEED = 2;
const UNIVERSE_ROTATION_SPEED = 0.05;
const FPS = 30;
const FRAME_TIME = 1000 / FPS;

interface ParticleData {
  x0: number;
  y0: number;
  phase: number;
  baseAngle: number;
  distance: number;
}

interface CalculatedParticle extends ParticleData {
  x: number;
  y: number;
}

function generateParticles(isOpen: boolean, quantity?: number): ParticleData[] {
  const particles: ParticleData[] = [];
  const centerX = CANVAS_SIZE / 2;
  const centerY = CANVAS_SIZE / 2;

  for (let i = 0; i < (quantity || NUM_PARTICLES); i++) {
    let distance;
    const angle = Math.random() * 2 * Math.PI;

    if (!isOpen) {
      // В закрытом состоянии - частицы только в кольце
      distance = RING_RADIUS + (Math.random() * 2 - 1) * (RING_THICKNESS / 2);
    } else {
      // В открытом состоянии - равномерное распределение
      distance = Math.random() * MAX_RADIUS;
    }

    const x0 = centerX + distance * Math.cos(angle);
    const y0 = centerY + distance * Math.sin(angle);
    const phase = Math.random() * 2 * Math.PI;

    particles.push({
      x0,
      y0,
      phase,
      baseAngle: angle,
      distance,
    });
  }

  return particles;
}

const Particles = ({
  open = true,
  title,
  quantity,
}: {
  open?: boolean;
  title?: string;
  quantity?: number;
}) => {
  const particles = useMemo(() => generateParticles(open, quantity), [open, quantity]);
  const scale = useSharedValue(1);
  const [calculatedParticles, setCalculatedParticles] = useState<CalculatedParticle[]>([]);
  const lastUpdateTime = useRef<number>(0);
  const animationFrameId = useRef<number>(0);
  const isMounted = useRef(true);

  const calculateParticlePositions = useCallback(
    (time: number, universeRotation: number) => {
      if (!isMounted.current) return [];

      const centerX = CANVAS_SIZE / 2;
      const centerY = CANVAS_SIZE / 2;
      const cosUniverseAngle = Math.cos(universeRotation);
      const sinUniverseAngle = Math.sin(universeRotation);

      return particles.map((particle) => {
        const offsetAngle = time * ROTATION_SPEED + particle.phase;
        const offsetX = CIRCLE_RADIUS * Math.cos(offsetAngle);
        const offsetY = CIRCLE_RADIUS * Math.sin(offsetAngle);

        const px = particle.x0 + offsetX;
        const py = particle.y0 + offsetY;

        const deltaX = px - centerX;
        const deltaY = py - centerY;

        const rotatedX = centerX + deltaX * cosUniverseAngle - deltaY * sinUniverseAngle;
        const rotatedY = centerY + deltaX * sinUniverseAngle + deltaY * cosUniverseAngle;

        return {
          ...particle,
          x: rotatedX,
          y: rotatedY,
        };
      });
    },
    [particles]
  );

  useEffect(() => {
    isMounted.current = true;
    scale.value = withRepeat(withTiming(1.15, { duration: 1200 }), -1, true);

    let time = 0;
    let universeRotation = 0;

    const animate = (currentTime: number) => {
      if (!isMounted.current) return;

      if (currentTime - lastUpdateTime.current >= FRAME_TIME) {
        time += 0.016;
        universeRotation += UNIVERSE_ROTATION_SPEED * 0.016;

        const newParticles = calculateParticlePositions(time, universeRotation);
        if (isMounted.current) {
          setCalculatedParticles(newParticles);
        }

        lastUpdateTime.current = currentTime;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      isMounted.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      cancelAnimation(scale);
    };
  }, [calculateParticlePositions, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const particleCircles = useMemo(
    () =>
      calculatedParticles.map((particle, index) => (
        <Circle key={index} cx={particle.x} cy={particle.y} r={PARTICLE_RADIUS} color="white" />
      )),
    [calculatedParticles]
  );

  return (
    <View>
      <Animated.View style={animatedStyle}>
        <Canvas
          style={{
            width: CANVAS_SIZE,
            height: CANVAS_SIZE,
            backgroundColor: 'transparent',
          }}>
          {particleCircles}
        </Canvas>
      </Animated.View>
      {!open ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography color="white" size={20} align="center" font="semibold">
            {title}
          </Typography>
        </View>
      ) : null}
    </View>
  );
};

export default React.memo(Particles);
