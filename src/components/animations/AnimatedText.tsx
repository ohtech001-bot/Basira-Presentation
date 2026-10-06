import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

export interface AnimatedTextProps {
  visible: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Split at spaces, never Arabic letters, so connected letterforms stay intact. */
export function AnimatedText({ visible, children, className, delay = 0 }: AnimatedTextProps) {
  const reduceMotion = useReducedMotion();
  const words = typeof children === 'string' ? children.split(/(\s+)/) : null;

  return (
    <motion.div
      className={clsx('animated-text', className)}
      initial={false}
      animate={visible ? 'shown' : 'hidden'}
      variants={{
        shown: {
          transition: {
            delayChildren: reduceMotion ? 0 : delay,
            staggerChildren: reduceMotion ? 0 : 0.045,
          },
        },
        hidden: { transition: { staggerChildren: 0 } },
      }}
      aria-hidden={!visible}
      inert={!visible}
    >
      {words ? (
        <>
          <span className="sr-only">{children}</span>
          <span aria-hidden="true">
            {words.map((word, index) =>
              /^\s+$/.test(word) ? (
                word
              ) : (
                <motion.span
                  key={`${index}-${word}`}
                  className="animated-text__word"
                  variants={{
                    shown: { opacity: 1, y: 0, filter: 'blur(0px)' },
                    hidden: {
                      opacity: 0,
                      y: reduceMotion ? 0 : 16,
                      filter: reduceMotion ? 'none' : 'blur(5px)',
                    },
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ),
            )}
          </span>
        </>
      ) : (
        <motion.div
          variants={{
            shown: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
          }}
          transition={{ duration: reduceMotion ? 0 : 0.65 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
