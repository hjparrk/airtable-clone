/** Util function for dynamic TailwindCss classes **/
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
