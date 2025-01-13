export const Features = () => {
  return (
    <div className="w-screen min-h-screen bg-black flex justify-center">
      <div className="w-[80%] min-h-screen px-8 py-8">
        <div className="py-24">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metagame Layer
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse yourself in a rich and ever-expanding universe where a vibrant
            array of products converge into an interconnected overlay experience
            on your world.
          </p>
        </div>
        <div className="border-hsla relative my-8 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src={"videos/feature-1.mp4"}
            title={'radient'}
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
            isCommingSoon={true}
          />
        </div>
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 ">
          <div className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src='videos/feature-2.mp4'
              title={'zigma'}
              description='An anime and gaming-inspired NFT collection - the IP primed for expansion.'
            />
          </div>
          <div className="bento-tilt_1 col-span-1 my-8">
            <BentoCard
              src='videos/feature-3.mp4'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BentoCard = ({ src, title, description, isCommingSoon }) => {
  return (
    <div className="relative h-full w-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 text-blue-50">
        <div>
          <h1 className="bento-title special-font">
            {title}
          </h1>
          {
            description && (
              <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
            )
          }
        </div>
      </div>
    </div>
  );
};
