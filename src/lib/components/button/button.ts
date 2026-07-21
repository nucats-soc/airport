import classNames from "classnames";

export type ButtonVariant = "primary" | "secondary";

export function getButtonStyle(
    type: ButtonVariant,
    isDisabled: boolean | undefined,
    extraClass: string | undefined
): string {
    return classNames(
        {
            "bg-green-700 hover:bg-green-600 active:bg-green-600":
                type == "primary" && !isDisabled,
            "bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-700":
                type == "secondary" && !isDisabled,

            "cursor-not-allowed opacity-60": isDisabled,
            "cursor-pointer": !isDisabled,
        },
        "text-white leading-5 rounded-full py-3 px-6",
        "transition-colors duration-200",
        "inline-flex items-center justify-center gap-2",
        extraClass
    )
}