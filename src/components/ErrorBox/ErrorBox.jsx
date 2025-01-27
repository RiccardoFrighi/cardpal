import {Image, Link} from "@heroui/react";

const ErrorBox = () => {

    return (
        <div className={"flex flex-col items-center pt-8 text-2xl font-medium gap-6"}>
            Oh no! Looks like an error occurred!
            <Image
                src={"https://64.media.tumblr.com/b12eac143b464ec8b2a52531b72ffe2b/31f6d7ea8b68dba8-33/s400x600/0f07bb5739c5ebeee9abf5fa1016a6a03c8cdfd4.gif"}
                alt=""
            />
            <Link href={"/"} className={"underline text-small"}>Back to Home</Link>
        </div>
    )
}

export default ErrorBox;