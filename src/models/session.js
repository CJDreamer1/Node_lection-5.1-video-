import mongoose from "mongoose";

const sessionChema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, //це в монгусі є тип ObjectId, він створює айді нашого юзера
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Session = mongoose.model("Session", sessionChema);
export { Session };
