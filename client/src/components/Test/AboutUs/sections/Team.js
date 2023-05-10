/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../MKBox";
import MKTypography from "../MKTypography";

import { Card } from "@mui/material";

function Team() {
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              The Executive Team
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              There&apos;s nothing I really wanted to do in life that I wasn&apos;t able to get good
              at. That&apos;s my skill.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
            <Card sx={{ mt: 3 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: -6 }}>
          <MKBox width="100%" pt={2} pb={1} px={2}>
            <MKBox
              component="img"
              src={require("../../../assets/images/amani.jpg")}
              width="100%"
              borderRadius="md"
              shadow="lg"
            />
          </MKBox>
        </Grid>
        <Grid item xs={12} md={6} lg={8} sx={{ my: "auto" }}>
          <MKBox pt={{ xs: 1, lg: 2.5 }} pb={2.5} pr={4} pl={{ xs: 4, lg: 1 }} lineHeight={1}>
            <MKTypography variant="h5">amani hadda</MKTypography>
            <MKTypography variant="h6" color="success" mb={1}>
              aaaaaaaaaaaaaa
            </MKTypography>
            <MKTypography variant="body2" color="text">
              aaaaaaaaaaaaaaaaaaaaa
            </MKTypography>
          </MKBox>
        </Grid>
      </Grid>
    </Card>
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
          <MKBox mb={1}>
            <Card sx={{ mt: 3 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: -6 }}>
          <MKBox width="100%" pt={2} pb={1} px={2}>
            <MKBox
              component="img"
              src={require("../../../assets/images/amani.jpg")}
              width="100%"
              borderRadius="md"
              shadow="lg"
            />
          </MKBox>
        </Grid>
        <Grid item xs={12} md={6} lg={8} sx={{ my: "auto" }}>
          <MKBox pt={{ xs: 1, lg: 2.5 }} pb={2.5} pr={4} pl={{ xs: 4, lg: 1 }} lineHeight={1}>
            <MKTypography variant="h5">amani hadda</MKTypography>
            <MKTypography variant="h6" color="success" mb={1}>
              aaaaaaaaaaaaaa
            </MKTypography>
            <MKTypography variant="body2" color="text">
              aaaaaaaaaaaaaaaaaaaaa
            </MKTypography>
          </MKBox>
        </Grid>
      </Grid>
    </Card>
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
            <Card sx={{ mt: 3 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: -6 }}>
          <MKBox width="100%" pt={2} pb={1} px={2}>
            <MKBox
              component="img"
              src={require("../../../assets/images/amani.jpg")}
              width="100%"
              borderRadius="md"
              shadow="lg"
            />
          </MKBox>
        </Grid>
        <Grid item xs={12} md={6} lg={8} sx={{ my: "auto" }}>
          <MKBox pt={{ xs: 1, lg: 2.5 }} pb={2.5} pr={4} pl={{ xs: 4, lg: 1 }} lineHeight={1}>
            <MKTypography variant="h5">amani hadda</MKTypography>
            <MKTypography variant="h6" color="success" mb={1}>
              aaaaaaaaaaaaaa
            </MKTypography>
            <MKTypography variant="body2" color="text">
              aaaaaaaaaaaaaaaaaaaaa
            </MKTypography>
          </MKBox>
        </Grid>
      </Grid>
    </Card>
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
          <MKBox mb={{ xs: 1, lg: 0 }}>
            <Card sx={{ mt: 3 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: -6 }}>
          <MKBox width="100%" pt={2} pb={1} px={2}>
            <MKBox
              component="img"
              src={require("../../../assets/images/amani.jpg")}
              width="100%"
              borderRadius="md"
              shadow="lg"
            />
          </MKBox>
        </Grid>
        <Grid item xs={12} md={6} lg={8} sx={{ my: "auto" }}>
          <MKBox pt={{ xs: 1, lg: 2.5 }} pb={2.5} pr={4} pl={{ xs: 4, lg: 1 }} lineHeight={1}>
            <MKTypography variant="h5">amani hadda</MKTypography>
            <MKTypography variant="h6" color="success" mb={1}>
              aaaaaaaaaaaaaa
            </MKTypography>
            <MKTypography variant="body2" color="text">
              aaaaaaaaaaaaaaaaaaaaa
            </MKTypography>
          </MKBox>
        </Grid>
      </Grid>
    </Card>
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
