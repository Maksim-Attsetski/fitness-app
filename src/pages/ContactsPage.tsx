import React, {FC} from 'react';
import {Link, ListItem, ListItemIcon} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import InboxIcon from '@mui/icons-material/Inbox';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ContactsPage: FC = () => {
    const contacts = [
        {text: 'Phone', href: 'tel:+375336644491', icon: <PhoneIcon/>},
        {text: 'Github', href: 'https://github.com/Maksim-Attsetski', icon: <GitHubIcon/>},
        {text: 'Email', href: 'mailto:maks2001maks2001@gmail.com', icon: <InboxIcon/>},
    ]
    return (
        <div className={'page'}>
            <Box>
                <Typography variant='body1'>
                    Приложение сделано Отцецким Максимом. <br/>
                    Ниже мои контакты, где можно мне написать или посмотреть другие мои проекты
                </Typography>
                <List>
                    {contacts.map(({text, href, icon}) =>
                        <ListItem disablePadding key={text}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <Link href={href}>{text}</Link>
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Box>
        </div>
    );
};

export default ContactsPage;