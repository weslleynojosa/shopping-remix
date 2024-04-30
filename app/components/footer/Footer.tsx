import React from "react";
import styled from "@emotion/styled";

import { mediumGrey } from "~/theme/colors";
import { gteSmallMedia } from "~/theme/custom-media";
import {weight} from "~/theme/typography";

const StyledFooter = styled.footer`
    padding: 2rem 1.5rem;
    position: absolute;

    ${gteSmallMedia} {
        bottom: 0;
        grid-template-columns: repeat(3, 1fr);
    }
`;

const Copyright = styled.span`
    color: ${mediumGrey};
    font-weight: ${weight.semibold};
`;

const Footer: React.FC = () => {
    return (
        <StyledFooter>
            <Copyright>Powered by Present Technologies</Copyright>
        </StyledFooter>
    );
};

export default Footer;
