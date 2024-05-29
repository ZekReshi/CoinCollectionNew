import { Image, Stack } from "@mantine/core";

function NotFound() {
    return (
        <Stack>
            You found the very special secret 404 page. Congratulations!
            <Image 
                src="https://http.cat/404"/>
        </Stack>
    )
}

export default NotFound
