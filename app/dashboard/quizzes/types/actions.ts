export type ActionItem =
  | { id: string; label: string; type: "link"; href: string }
  | { id: string; label: string; type: "modal"; modalKey: string }
  | { id: string; label: string; type: "action"; actionKey: string };
