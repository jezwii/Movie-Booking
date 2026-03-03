import React, { useMemo } from "react";
import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { setBookingDate, setBookingTime } from "@/app/store/slices/movieSlice";

const DAYS = 3;
const TIMES = ["10:00 AM", "1:00 PM", "6:00 PM"];

function formatDay(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const PickDate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bookingDate = useSelector(
    (state: RootState) => state.movies.bookingDate,
  );
  const bookingTime = useSelector(
    (state: RootState) => state.movies.bookingTime,
  );

  const days = useMemo(() => {
    const list: { label: string; value: string }[] = [];
    const today = new Date();
    for (let i = 0; i < DAYS; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      list.push({ label: formatDay(d), value: d.toISOString().split("T")[0] });
    }
    return list;
  }, []);

  const handleDateSelect = (value: string) => {
    dispatch(setBookingDate(value));
    dispatch(setBookingTime(null));
  };

  const handleTimeSelect = (time: string) => {
    dispatch(setBookingTime(time));
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        {days.map((d) => (
          <Card
            key={d.value}
            sx={{
              flex: 1,
              justifyContent: "center",
              bgcolor:
                bookingDate === d.value ? "primary.main" : "background.default",
            }}
          >
            <CardActionArea
              onClick={() => handleDateSelect(d.value)}
              sx={{ p: 1 }}
            >
              <Typography align="center">{d.label}</Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        {TIMES.map((t) => (
          <Card
            key={t}
            sx={{
              flex: 1,

              bgcolor:
                bookingTime === t ? "primary.main" : "background.default",
            }}
          >
            <CardActionArea onClick={() => handleTimeSelect(t)} sx={{ p: 1 }}>
              <Typography align="center">{t}</Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PickDate;
