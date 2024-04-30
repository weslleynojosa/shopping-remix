import styled from "@emotion/styled";
import { darkGrey, mediumGrey } from "~/theme/colors";
import { weight } from "~/theme/typography";
import { gteMediumMedia, gteSmallMedia } from "~/theme/custom-media";

export const Main = styled.main`
    padding: 5rem 6rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${gteSmallMedia} {
        flex-direction: row;
    }

    ${gteMediumMedia} {
        flex-direction: row;
    }
`;

export const ImageWrapper = styled.div`
    width: 100%;
    height: 40rem;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export const ProductInformation = styled.div`
    width: 100%;
    height: 60%;
    padding: 0 2rem;
`;

export const Category = styled.p`
    color: ${mediumGrey};
    font-weight: ${weight.semibold};

    &:first-letter {
        text-transform: uppercase;
    }
`;

export const Price = styled.p`
    font-weight: ${weight.bold};
`;

export const Description = styled.div`
    margin-bottom: 3rem;
    text-align: justify;
    color: ${darkGrey};
`;
