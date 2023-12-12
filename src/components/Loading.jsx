import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";

const Loading = () => {
  return (
    <div className="py-4">
      <HourglassBottomTwoToneIcon className="animate-pulse" />
      Loading comments...
    </div>
  );
};

export default Loading;
