import { projectDataRepo } from "./ProjectData";

describe("FaunaDbRepositoryTest", () => {
  it("Fetches all Projects", () => {
    // Remember to return promise for it to wait for its finish to return test result.
    return projectDataRepo.getAll().then((res) => {
      console.log(res);
    });
  });
});
