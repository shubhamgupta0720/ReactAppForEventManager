import { Field, Formik, Form, ErrorMessage } from "formik"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEventApi } from "../apiservices/eventsapi/GetEventApi"
import { updateEventApi } from "../apiservices/eventsapi/UpdateEventApi"
import { createEventApi } from "../apiservices/eventsapi/CreateEventApi"
import { useAuth } from "../security/AuthContext"

export default function UpdateComponent(){
    
    const {eventId} = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [dateOfEvent, setDateOfEvent] = useState('')

    const authContext = useAuth()
    const orgId = authContext.orgId

    useEffect(
        () => getEvent(), [eventId]
    )
    
    function getEvent(){
        if(eventId != -1){
            getEventApi(eventId)
            .then(response => {
                setTitle(response.data.title)
                setContent(response.data.content)
                setDateOfEvent(response.data.dateOfEvent)
            })
            .catch(error => console.log(error))
        }
}

    function onSubmit(values){
        // console.log(values)
        const event = {
            eventId: eventId,
            title: values.title,
            content: values.content,
            dateOfEvent: values.dateOfEvent
            
        }
        if(eventId == -1){
            createEventApi(event, orgId)
            .then(response => {
                navigate('/events')
            })
            .catch(error => console.log(error))
            console.log(orgId)
        }
        else{
            updateEventApi(eventId, event)
            .then(response => {
                navigate('/events')
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values){
        let errors = {
            // title: 'Enter a valid title',
            // content: 'Enter a valid content',
            // dateOfEvent: 'Enter valid date format'
        }
        if(values.title.length < 3){
            errors.title = 'Enter a valid title'
        }
        if(values.content.length < 3){
            errors.content = 'Enter a valid content'
        }
        if(values.dateOfEvent == null || values.dateOfEvent == ''){
            errors.dateOfEvent = 'Enter a valid date'
        }
        // console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Event details</h1>
            <div>
                <Formik initialValues={{title, content, dateOfEvent}} enableReinitialize={true} onSubmit = {onSubmit} validate = {validate} validateOnBlur = {false} validateOnChange = {false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage 
                                    name="title"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <ErrorMessage 
                                    name="content"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <ErrorMessage 
                                    name="dateOfContent"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Title</label>
                                    <Field type="text" className="form-control" name="title"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Content</label>
                                    <Field type="text" className="form-control" name="content"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Date of Event</label>
                                    <Field type="date" className="form-control" name="dateOfEvent"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}