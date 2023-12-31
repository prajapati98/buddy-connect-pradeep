import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import RecentUser from "./RecentUser";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { action } from "../features/getDeletedList/action";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const size = {
  width: 400,
  height: 200,
};
function Dashboard() {
  const selectedState = useSelector((state: RootState) => state.userList);
  const [activeUser, setActiveUser] = React.useState(0);
  const [deActiveUser, setDeActiveUser] = React.useState(0);
  const [hr, setHr] = React.useState(0);

  const [associate, setAssociate] = React.useState(0);
  const [superAdmin, setSuperAdmin] = React.useState(0);
  const [admin, setAdmin] = React.useState(0);

  React.useEffect(() => {
    let activeCount = 0;
    let deActiveCount = 0;
    let hrCount = 0;
    let associateCount = 0;
    let superAdminCount = 0;
    let adminCount = 0;
    if (selectedState && Array.isArray(selectedState.userList)) {
      selectedState.userList.map((user) => {
        if (user.status === "deActive" || user.status === "pending") {
          deActiveCount += 1;
        } else if (user.status === "active") {
          activeCount += 1;
        }
        if (user.role === "associate") {
          associateCount += 1;
        } else if (user.role === "superAdmin") {
          superAdminCount += 1;
        } else if (user.role === "admin") {
          adminCount += 1;
        } else if (user.role === "hr") {
          hrCount += 1;
        }
      });

      setDeActiveUser(deActiveCount);
      setActiveUser(activeCount);
      setHr(hrCount);
      setAssociate(associateCount);
      setAdmin(adminCount);
      setSuperAdmin(superAdminCount);
    }
  }, [selectedState]);

  const data = [
    { value: hr, label: "HR", color: "#cddc39" },
    { value: admin, label: "Admin", color: "#2e73ab" },
    { value: associate, label: "Associate", color: "#42a5f5" },
    { value: superAdmin, label: "Super Admin", color: "#00e5ff" },
  ];
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(action());
  }, [dispatch]);
  const selectedStateFormer = useSelector(
    (state: RootState) => state.DeletedList
  );
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
      <Grid
        container
        spacing={2}
        columns={16}
        sx={{
          mt: 3,
        }}
      >
        <Grid xs={8} md={4}>
          <Item>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <PeopleAltIcon
                sx={{
                  fontSize: "50px",
                  color: "#1976d2",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: "#000",
                }}
              >
                Total Users
              </Typography>
            </Box>
            <Typography
              variant="h3"
              sx={{
                color: "#1976d2",
              }}
            >
              {Array.isArray(selectedState.userList)
                ? selectedState.userList.length
                : 0}
            </Typography>
          </Item>
        </Grid>
        <Grid xs={8} md={4}>
          <Item>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <BookmarkAddedIcon
                sx={{
                  fontSize: "50px",
                  color: "#4caf50",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: "#000",
                }}
              >
                Active Users
              </Typography>
            </Box>
            <Typography
              variant="h3"
              sx={{
                color: "#4caf50",
              }}
            >
              {activeUser}
            </Typography>
          </Item>{" "}
        </Grid>
        <Grid xs={8} md={4}>
          <Item>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <BookmarkAddIcon
                sx={{
                  fontSize: "50px",
                  color: "#ff9800",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: "#000",
                }}
              >
                Deactive Users
              </Typography>
            </Box>
            <Typography
              variant="h3"
              sx={{
                color: "#ff9800",
              }}
            >
              {deActiveUser}
            </Typography>
          </Item>
        </Grid>
        <Grid xs={8} md={4}>
          <Item>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <DeleteSweepIcon
                sx={{
                  fontSize: "50px",
                  color: "#d32f2f",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: "#000",
                }}
              >
                Former Users
              </Typography>
            </Box>
            <Typography
              variant="h3"
              sx={{
                color: "#d32f2f",
              }}
            >
              {selectedStateFormer.DeletedList
                ? selectedStateFormer.DeletedList?.length
                : 0}
            </Typography>
          </Item>{" "}
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 10,
        }}
      >
        <Grid container spacing={2} columns={6}>
          <Grid xs={6} md={4}>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  valueFormatter: (value) =>
                    value == null ? "NaN" : value.toString(),
                },
                {
                  data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
                },
                {
                  data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
                  valueFormatter: (value) =>
                    value == null ? "?" : value.toString(),
                },
              ]}
              height={200}
              margin={{ top: 10, bottom: 20 }}
            />

            <Box
              sx={{
                mt: 8,
              }}
            >
              <RecentUser />
            </Box>
          </Grid>
          <Grid xs={6} md={2}>
            <Item
              sx={{
                padding: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  mb: 3,
                }}
              >
                Users According Role
              </Typography>

              <PieChart
                series={[
                  {
                    arcLabel: (item) => ` (${item.value})`,
                    arcLabelMinAngle: 0,
                    data,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                    fontWeight: "bold",
                  },
                }}
                {...size}
                legend={{ hidden: true }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                {data.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        background: `${item.color}`,
                      }}
                    ></span>
                    <span
                      style={{
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      {`${item.label}`}
                    </span>
                  </Box>
                ))}
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
