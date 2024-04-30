import styled from "@emotion/styled";
import {gteMediumMedia, gteSmallMedia} from "~/theme/custom-media";

export const ProductListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);

    ${gteSmallMedia} {
        grid-template-columns: repeat(3,1fr);
    }

    ${gteMediumMedia} {
        grid-template-columns: repeat(4,1fr);
    }
`
