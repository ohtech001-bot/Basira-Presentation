import { Counter } from './Counter';

interface AnimatedNumberTextProps {
  text: string;
}

/** Keep the complete wording accessible while its figures count up automatically. */
export function AnimatedNumberText({ text }: AnimatedNumberTextProps) {
  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text
          .split(/(\d+)/u)
          .map((part, index) =>
            /^\d+$/u.test(part) ? (
              <Counter key={index} value={Number(part)} visible locale="en-US" />
            ) : (
              part
            ),
          )}
      </span>
    </span>
  );
}
