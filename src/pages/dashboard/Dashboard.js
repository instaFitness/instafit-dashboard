import React from "react"
import { Grid, Stack } from "@mui/material"
import UserCard from "../../components/dashboard/UserCard"
import SubscriptionCard from "../../components/dashboard/SubscriptionCard"
import SocialCard from "../../components/dashboard/SocialCard"
import PlanRequestCard from "../../components/dashboard/PlanRequestCard"
import TrainingCard from "../../components/dashboard/TrainingCard"
import { useGetUserLists } from "../../hooks/users/hooks"
import { GetSubscriptionsLists } from "../../hooks/subscription/hooks"
import { GetSocialsLists } from "../../hooks/socials/hooks"
import { GetRequestPlanList } from "../../hooks/requests/hooks"
import { GetTrainingPlanLists } from "../../hooks/trainings/hooks"

const Dashboard = () => {
  const { users } = useGetUserLists()
  const { subscription_items } = GetSubscriptionsLists()
  const { socials } = GetSocialsLists()
  const { request_plan } = GetRequestPlanList()
  const { trainings } = GetTrainingPlanLists()
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Stack spacing={2} direction='row'>
          <UserCard users={users} />
          <SubscriptionCard subscription_items={subscription_items} />
          <SocialCard socials={socials} />
        </Stack>
        <Stack sx={{ marginTop: 2 }} spacing={2} direction='row'>
          <PlanRequestCard request_plan={request_plan} />
          <TrainingCard trainings={trainings} />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Dashboard
