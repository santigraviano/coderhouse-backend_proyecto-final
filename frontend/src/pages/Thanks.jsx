import { Card, CardContent, Grid, Typography } from "@mui/material"

function Thanks () {
  return (
    <>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography>¡Gracias por tu pedido!</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Thanks