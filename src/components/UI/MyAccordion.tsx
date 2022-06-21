import React, {FC} from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import {IMuscles} from "../../types/exercise";

interface IProps {
    expanded: string | boolean,
    handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void,
    index: number,
    title: string,
    text: string | string[] | number
}

const MyAccordion: FC<IProps> = ({expanded, handleChange, index, title, text}) => {
    return (
        <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {(typeof text === "object")
                    ? text.map((item) => <span key={item} style={{margin: '0 0.5rem'}}>{item}</span>)
                    : text}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default MyAccordion;