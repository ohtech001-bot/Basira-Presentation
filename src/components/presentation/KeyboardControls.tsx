import { useKeyboardNavigation, type NavigationHandlers } from '../../hooks/useKeyboardNavigation';

export function KeyboardControls({
  handlers,
  enabled,
}: {
  handlers: NavigationHandlers;
  enabled: boolean;
}) {
  useKeyboardNavigation(handlers, enabled);
  return null;
}
