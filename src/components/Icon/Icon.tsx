import type { ComponentProps, FC } from "react";

interface IconProps extends ComponentProps<"svg"> {
    svg: FC<ComponentProps<"svg">>;
}

export function Icon({ svg: SvgComponent, className, ...props }: IconProps) {
    return <SvgComponent className={className} {...props} />;
}
