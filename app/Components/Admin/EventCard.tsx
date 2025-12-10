import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import React from 'react'

const EventCard = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Event Title</CardTitle>
                    <CardDescription>Event Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        This is a brief overview of the event. It provides essential details that attendees need to know.
                    </p>
                </CardContent>
                <CardFooter>
                    <CardAction>
                        <Button>View Details</Button>
                    </CardAction>
                </CardFooter>
            </Card>
        </div>
    )
}

export default EventCard