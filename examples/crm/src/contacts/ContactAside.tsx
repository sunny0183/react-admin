import * as React from 'react';
import {
    TextField,
    EmailField,
    DateField,
    ReferenceManyField,
    EditButton,
    ShowButton,
    ReferenceField,
    SelectField,
    FunctionField,
    useRecordContext,
    UrlField,
} from 'react-admin';
import { Box, Typography, Divider } from '@mui/material';
import { TagsListEdit } from './TagsListEdit';
import { AddTask } from '../tasks/AddTask';
import { TasksIterator } from '../tasks/TasksIterator';

import { Contact, Sale } from '../types';
import { useConfigurationContext } from '../root/ConfigurationContext';

export const ContactAside = ({ link = 'edit' }: { link?: 'edit' | 'show' }) => {
    const { contactGender } = useConfigurationContext();
    const record = useRecordContext<Contact>();
    if (!record) return null;
    return (
        <Box ml={4} width={250} minWidth={250}>
            <Box mb={2} ml="-5px">
                {link === 'edit' ? (
                    <EditButton label="Edit Contact" />
                ) : (
                    <ShowButton label="Show Contact" />
                )}
            </Box>
            <Typography variant="subtitle2">Personal info</Typography>
            <Divider sx={{ mb: 2 }} />
            <EmailField sx={{ display: 'block' }} source="email" />
            <UrlField source="linkedin_url" target="_blank" rel="noopener" />
            {record.phone_number1 && (
                <Box>
                    <TextField source="phone_number1" />{' '}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                    >
                        Work
                    </Typography>
                </Box>
            )}
            {record.phone_number2 && (
                <Box>
                    <TextField source="phone_number2" />{' '}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                    >
                        Home
                    </Typography>
                </Box>
            )}
            <SelectField
                source="gender"
                choices={contactGender}
                optionText="label"
                optionValue="value"
            />
            <Typography variant="subtitle2" mt={2}>
                Background
            </Typography>
            <Divider />
            <Typography variant="body2" mt={2}>
                {record && record.background}
            </Typography>
            <Box mt={1} mb={3}>
                <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                >
                    Added on
                </Typography>{' '}
                <DateField
                    source="first_seen"
                    options={{ year: 'numeric', month: 'long', day: 'numeric' }}
                    color="textSecondary"
                />
                <br />
                <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                >
                    Last activity on
                </Typography>{' '}
                <DateField
                    source="last_seen"
                    options={{ year: 'numeric', month: 'long', day: 'numeric' }}
                    color="textSecondary"
                />
                <br />
                <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                >
                    Followed by
                </Typography>{' '}
                <ReferenceField source="sales_id" reference="sales">
                    <FunctionField<Sale>
                        source="last_name"
                        render={record =>
                            `${record.first_name} ${record.last_name}`
                        }
                    />
                </ReferenceField>
            </Box>
            <Box mb={3}>
                <Typography variant="subtitle2">Tags</Typography>
                <Divider />
                <TagsListEdit />
            </Box>
            <Box>
                <Typography variant="subtitle2">Tasks</Typography>
                <Divider />
                <ReferenceManyField
                    target="contact_id"
                    reference="tasks"
                    sort={{ field: 'due_date', order: 'ASC' }}
                >
                    <TasksIterator />
                </ReferenceManyField>
                <AddTask />
            </Box>
        </Box>
    );
};
