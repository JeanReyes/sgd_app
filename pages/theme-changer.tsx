
import { Layout } from '../components/layouts'
import { Box, Card, CardContent, FormControl, FormLabel, Slider } from '@mui/material'

const themeChanger = () => {
    
    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Theme control</FormLabel>
                    </FormControl>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default themeChanger
