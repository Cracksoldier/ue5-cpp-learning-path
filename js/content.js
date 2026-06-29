/*
 * content.js — the Unreal Engine 5.7 / 5.8 C++ learning path curriculum.
 *
 * This file is loaded with a classic <script> tag (NOT a module and NOT via
 * fetch) so the page works from the file:// protocol as well as GitHub Pages.
 * Everything the app renders lives in window.CURRICULUM below.
 *
 * To extend the path: add stages / modules / exercises here. No other file
 * needs to change. Keep every `id` unique and stable — progress is keyed by id,
 * so renaming an id resets that item's saved completion state.
 *
 * Resource links target canonical, version-stable pages where possible.
 * External links can move over time; if one 404s, search its title on
 * dev.epicgames.com or the community forums.
 */
window.CURRICULUM = {
  version: 1,
  title: "Unreal Engine C++ Learning Path",
  engineVersions: "5.7 / 5.8",
  subtitle: "A guided road from your first UCLASS to shipping, profiling and extending the engine.",
  stages: [
    /* =====================================================================
     * STAGE 0 — FOUNDATIONS & SETUP
     * ===================================================================== */
    {
      id: "s0",
      title: "Foundations & Setup",
      level: "Beginner",
      summary:
        "Get a working C++ toolchain, install UE 5.7/5.8, create your first C++ project and understand how Unreal builds and reloads your code.",
      modules: [
        {
          id: "s0-m1",
          title: "C++ prerequisites for Unreal",
          objectives: [
            "Be comfortable with C++ classes, pointers, references and headers/cpp separation.",
            "Understand the pieces of C++ Unreal leans on: inheritance, virtual functions, templates and the preprocessor.",
            "Know which standard-library habits Unreal replaces with its own types (you'll meet them in Stage 1)."
          ],
          resources: [
            { title: "learncpp.com — modern C++ from scratch", url: "https://www.learncpp.com/", type: "doc" },
            { title: "cppreference — language reference", url: "https://en.cppreference.com/w/cpp/language", type: "doc" },
            { title: "Epic C++ Coding Standard for Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s0-m1-e1",
              title: "C++ warm-up: a small class hierarchy",
              kind: "exercise",
              difficulty: "easy",
              goal: "Refresh core C++ outside the engine so engine-specific concepts later stand on their own.",
              steps: [
                "In a plain C++ console project, write a base class Shape with a virtual Area() method.",
                "Derive Circle and Rectangle and override Area().",
                "Store several shapes in a std::vector<Shape*> and print each area through the base pointer."
              ],
              acceptance: [
                "Calling Area() through a base pointer dispatches to the derived implementation.",
                "You can explain why the base destructor should be virtual here."
              ],
              hints: ["If the wrong Area() runs, check that the method is marked virtual in the base."]
            },
            {
              id: "s0-m1-e2",
              title: "Headers vs. translation units",
              kind: "exercise",
              difficulty: "easy",
              goal: "Internalize the declaration/definition split Unreal enforces everywhere.",
              steps: [
                "Split your Shape classes into .h (declarations) and .cpp (definitions).",
                "Add an include guard or #pragma once to each header.",
                "Cause a deliberate linker error (declare a method, never define it) and read the message."
              ],
              acceptance: ["You can read a linker error and identify the missing definition."],
              hints: ["Unreal uses #pragma once at the top of every header — do the same."]
            }
          ]
        },
        {
          id: "s0-m2",
          title: "Install UE 5.7/5.8 and the C++ toolchain",
          objectives: [
            "Install Unreal Engine 5.7 or 5.8 via the Epic Games Launcher (or build from source — covered later).",
            "Install Visual Studio (Windows) or set up Rider/Xcode with the correct workloads for Unreal.",
            "Verify the engine compiles and launches a C++ template project."
          ],
          resources: [
            { title: "Setting Up Visual Studio for Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/setting-up-visual-studio-development-environment-for-cplusplus-projects-in-unreal-engine", type: "doc" },
            { title: "Unreal Engine 5.7 Documentation (home)", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-5-7-documentation", type: "doc" },
            { title: "Unreal Engine 5.7 Release Notes (toolchain: MSVC 14.44)", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-5-7-release-notes", type: "doc" },
            { title: "JetBrains Rider for Unreal Engine", url: "https://www.jetbrains.com/lp/rider-unreal/", type: "doc" },
            { title: "Epic — Your First Game in Unreal Engine 5", url: "https://dev.epicgames.com/community/learning/tutorials/e2V/your-first-game-in-unreal-engine-5", type: "video" }
          ],
          exercises: [
            {
              id: "s0-m2-e1",
              title: "Create your first C++ project",
              kind: "exercise",
              difficulty: "easy",
              goal: "Confirm your whole toolchain works before learning any engine APIs.",
              steps: [
                "In the Epic Launcher create a new Games > Third Person project with C++ selected (not Blueprint).",
                "Let the project generate, then open the solution in your IDE.",
                "Build the project and Play In Editor."
              ],
              acceptance: [
                "The project compiles with no errors and you can move the character in PIE.",
                "You can locate the generated Source/<Project>/ folder and its .Build.cs file."
              ],
              hints: ["First compile is slow — the engine is warming caches. Subsequent builds are far faster."]
            },
            {
              id: "s0-m2-e2",
              title: "Tour the generated source",
              kind: "exercise",
              difficulty: "easy",
              goal: "Map the files Unreal generated to the concepts behind them.",
              steps: [
                "Open <Project>.Build.cs and identify the PublicDependencyModuleNames list.",
                "Open the generated GameMode and Character .h/.cpp files.",
                "Find the <Project>.uproject file and open it in a text editor to see the module + plugin list."
              ],
              acceptance: ["You can name what .Build.cs, .uproject and the *.generated.h includes are each for (even if roughly)."],
              hints: ["The #include \"<Name>.generated.h\" line must always be the LAST include in a header — remember this for Stage 1."]
            }
          ]
        },
        {
          id: "s0-m3",
          title: "The build pipeline & Live Coding",
          objectives: [
            "Understand UnrealBuildTool (UBT) and UnrealHeaderTool (UHT) at a high level.",
            "Use Live Coding / Hot Reload to iterate on C++ without a full editor restart.",
            "Know when a change requires a full rebuild vs. a Live Coding patch."
          ],
          resources: [
            { title: "Live Coding for Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/using-live-coding-to-recompile-unreal-engine-applications-at-runtime", type: "doc" },
            { title: "Unreal Build Tool overview", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-build-tool-in-unreal-engine", type: "doc" },
            { title: "Unreal Header Tool & reflection", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-header-tool-for-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s0-m3-e1",
              title: "Iterate with Live Coding",
              kind: "exercise",
              difficulty: "medium",
              goal: "Build the fast edit-compile-test loop you'll use for the rest of the path.",
              steps: [
                "With the editor open, add a UE_LOG line to your Character's BeginPlay.",
                "Trigger Live Coding (Ctrl+Alt+F11 by default) instead of closing the editor.",
                "Play and confirm the log appears in the Output Log."
              ],
              acceptance: ["You changed C++ behavior without restarting the editor."],
              hints: ["Adding new UPROPERTY/UFUNCTION reflected members sometimes needs a full restart — note when Live Coding refuses a patch."]
            },
            {
              id: "s0-m3-e2",
              title: "Challenge: read a build failure",
              kind: "challenge",
              difficulty: "medium",
              goal: "Build the habit of reading UBT/UHT output rather than guessing.",
              steps: [
                "Introduce a UHT error on purpose (e.g. put #include \"X.generated.h\" not-last in a header).",
                "Compile and read the UnrealHeaderTool error.",
                "Fix it, then break the build a second way (a missing module in .Build.cs) and read that error too."
              ],
              acceptance: ["You can distinguish a UHT (reflection) error from a normal compiler/linker error from the message alone."],
              hints: ["UHT errors mention reflection/generated code; linker errors mention unresolved symbols."]
            }
          ]
        },
        {
          /* Linux setup comes last in Stage 0 by design: it builds on the UBT/UHT
           * and build-pipeline concepts from the module above. The id is
           * non-sequential (s0-m4 after s0-m3) but stable, so progress is kept. */
          id: "s0-m4",
          title: "Set up UE on Linux",
          objectives: [
            "Install Unreal Engine on a Linux workstation: there is no Epic Games Launcher on Linux, so you either download an official binary release or build the engine from GitHub source.",
            "Know the Linux prerequisites: a Vulkan-capable GPU and recent drivers (Linux renders through Vulkan only), Epic's bundled clang toolchain, and the bundled .NET runtime that UnrealBuildTool runs on.",
            "Generate project files and build from the terminal, and set up VS Code or Rider as your IDE.",
            "Respect the gotcha that bites every Windows-trained developer first: the filesystem is case-sensitive."
          ],
          resources: [
            { title: "Linux Development Quickstart for Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/linux-development-quickstart-for-unreal-engine", type: "doc" },
            { title: "Linux Development Requirements for Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/linux-development-requirements-for-unreal-engine", type: "doc" },
            { title: "Unreal Engine for Linux — binary releases (Epic sign-in required)", url: "https://www.unrealengine.com/en-US/linux", type: "doc" },
            { title: "Setting Up Visual Studio Code for Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/setting-up-visual-studio-code-for-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s0-m4-e1",
              title: "Install the engine and launch the editor",
              kind: "exercise",
              difficulty: "easy",
              goal: "Get a working Unreal Editor on Linux without a launcher to hold your hand.",
              steps: [
                "Confirm your GPU does Vulkan: run vulkaninfo --summary (or vkcube) and check a real device is listed — Linux has no D3D fallback.",
                "Sign in on the Unreal Engine for Linux page, download the 5.7/5.8 binary release .zip and unzip it somewhere you own (e.g. ~/UnrealEngine).",
                "Launch Engine/Binaries/Linux/UnrealEditor from the terminal and create a Games > Third Person project with C++ selected."
              ],
              acceptance: [
                "The editor launches, the C++ project compiles and you can move the character in PIE.",
                "You can explain where the engine lives on disk and why there was no launcher involved."
              ],
              hints: [
                "A long first startup is normal — the editor is compiling Vulkan shaders; let it finish once and later launches are fast.",
                "Keep the terminal you launched from open: on Linux the log scrolls right there, which beats hunting for the log file."
              ]
            },
            {
              id: "s0-m4-e2",
              title: "Build from the terminal",
              kind: "exercise",
              difficulty: "medium",
              goal: "Own the terminal build workflow — on Linux the shell scripts ARE the build system, the IDE is just a front-end.",
              steps: [
                "From the engine root, run GenerateProjectFiles.sh -project=/absolute/path/To/YourGame.uproject -game -vscode.",
                "Build the editor target directly: Engine/Build/BatchFiles/Linux/Build.sh YourGameEditor Linux Development -project=/absolute/path/To/YourGame.uproject.",
                "Open the generated workspace in VS Code (or the .uproject in Rider), then launch the result: Engine/Binaries/Linux/UnrealEditor /absolute/path/To/YourGame.uproject."
              ],
              acceptance: [
                "The project builds from the terminal with no IDE involved and the editor opens it afterwards.",
                "You can name the three arguments every Build.sh invocation needs: target, platform, configuration."
              ],
              hints: [
                "Build.sh and GenerateProjectFiles.sh want absolute -project paths — relative paths are the most common first failure.",
                "UnrealBuildTool itself runs on the .NET runtime Epic bundles under Engine/Binaries/ThirdParty/DotNet, and compiles with Epic's bundled clang — you install neither yourself."
              ]
            },
            {
              id: "s0-m4-e3",
              title: "Challenge: the case-sensitivity trap",
              kind: "challenge",
              difficulty: "medium",
              goal: "Experience the classic cross-platform break: code that builds on Windows but not on Linux.",
              steps: [
                "In one of your .cpp files, change an #include to the wrong case (e.g. #include \"yourgamecharacter.h\" instead of \"YourGameCharacter.h\") — on a Windows checkout this compiles fine.",
                "Build from the terminal with Build.sh and read clang's 'file not found' error.",
                "Fix it, then sweep your project for other case-sensitive landmines: file paths in config files and any hardcoded asset paths in code."
              ],
              acceptance: [
                "You can explain why the bad include builds on Windows (NTFS is case-insensitive) but fails on Linux.",
                "The project builds cleanly again and you adopted the rule: include paths match filenames character for character."
              ],
              hints: ["clang says 'file not found' where MSVC said nothing — when porting Windows-grown code to Linux, headers with mismatched case are suspect number one."]
            }
          ]
        }
      ]
    },

    /* =====================================================================
     * STAGE 1 — UE C++ FUNDAMENTALS
     * ===================================================================== */
    {
      id: "s1",
      title: "UE C++ Fundamentals",
      level: "Beginner",
      summary:
        "Learn the Unreal type system: UCLASS/USTRUCT/UENUM, the UPROPERTY/UFUNCTION reflection macros, UObjects, garbage collection and the core container/string types.",
      modules: [
        {
          id: "s1-m1",
          title: "Reflection: UCLASS, USTRUCT, UENUM",
          objectives: [
            "Declare reflected classes, structs and enums with the correct macros and *.generated.h include.",
            "Understand what the reflection system enables (serialization, editor exposure, GC, networking).",
            "Know the difference between a UObject-derived UCLASS and a plain USTRUCT value type."
          ],
          resources: [
            { title: "Unreal Object handling & reflection (Programming guide)", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-object-handling-in-unreal-engine", type: "doc" },
            { title: "Gameplay Classes (UClass, UObject)", url: "https://dev.epicgames.com/documentation/unreal-engine/gameplay-classes-in-unreal-engine", type: "doc" },
            { title: "Structs (USTRUCT) in Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/structs-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s1-m1-e1",
              title: "Declare a reflected struct and enum",
              kind: "exercise",
              difficulty: "easy",
              goal: "Get the macro + generated.h boilerplate into muscle memory.",
              steps: [
                "Create a USTRUCT(BlueprintType) FItemData with a few UPROPERTY fields (name, weight, value).",
                "Create a UENUM(BlueprintType) EItemRarity (uint8) with several values.",
                "Add a UPROPERTY of your enum type to the struct."
              ],
              acceptance: [
                "Both compile and the struct's fields appear in a Blueprint that references it.",
                "The enum uses : uint8 and each enumerator has a UMETA(DisplayName=...)."
              ],
              hints: ["BlueprintType is what makes the struct/enum usable from Blueprint graphs."]
            },
            {
              id: "s1-m1-e2",
              title: "Challenge: explain the generated.h",
              kind: "challenge",
              difficulty: "medium",
              goal: "Demystify the codegen so errors stop being magic.",
              steps: [
                "Find the *.generated.h your class produces under Intermediate/Build/.../Inc.",
                "Skim what GENERATED_BODY() expands to.",
                "Write a 3-sentence note (in a code comment) explaining what UHT generated and why."
              ],
              acceptance: ["You can say, in your own words, what GENERATED_BODY() injects into your class."],
              hints: ["Don't edit generated files — they're overwritten every build."]
            }
          ]
        },
        {
          id: "s1-m2",
          title: "UPROPERTY, UFUNCTION & specifiers",
          objectives: [
            "Expose data to the editor and Blueprint with the right UPROPERTY specifiers.",
            "Expose functions with UFUNCTION (BlueprintCallable, BlueprintPure, CallInEditor).",
            "Understand EditAnywhere vs. VisibleAnywhere and the Blueprint read/write specifiers."
          ],
          resources: [
            { title: "UPROPERTY specifiers reference", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-uproperties", type: "doc" },
            { title: "UFUNCTION specifiers reference", url: "https://dev.epicgames.com/documentation/unreal-engine/ufunctions-in-unreal-engine", type: "doc" },
            { title: "Tom Looman — Unreal Engine C++ Complete Guide", url: "https://www.tomlooman.com/unreal-engine-cpp-guide/", type: "doc" }
          ],
          exercises: [
            {
              id: "s1-m2-e1",
              title: "Expose a tunable property",
              kind: "exercise",
              difficulty: "easy",
              goal: "Make C++ data editable by designers in the editor.",
              steps: [
                "Add a UPROPERTY(EditAnywhere, BlueprintReadWrite, Category=\"Movement\") float to your Character.",
                "Use it inside Tick to scale something visible (e.g. a rotation speed).",
                "Change the value on a placed instance and confirm behavior changes."
              ],
              acceptance: ["The property is editable per-instance in the Details panel and changing it changes behavior."],
              hints: ["Use Category to keep the Details panel organized."]
            },
            {
              id: "s1-m2-e2",
              title: "Expose a callable function",
              kind: "exercise",
              difficulty: "easy",
              goal: "Call C++ from Blueprint.",
              steps: [
                "Add a UFUNCTION(BlueprintCallable, Category=\"Gameplay\") that resets your tunable value.",
                "Call it from a Blueprint subclass on a key press.",
                "Add a BlueprintPure getter and note how its node differs (no exec pins)."
              ],
              acceptance: ["A Blueprint can call your C++ function and the BlueprintPure node has no execution pins."],
              hints: ["BlueprintPure implies no side effects — use it only for getters/computations."]
            }
          ]
        },
        {
          id: "s1-m3",
          title: "UObjects, lifetime & garbage collection",
          objectives: [
            "Understand the UObject lifecycle and how the GC reaches live objects.",
            "Use UPROPERTY()/TObjectPtr to keep referenced UObjects alive.",
            "Know when to use NewObject vs. SpawnActor and the danger of raw pointers to UObjects."
          ],
          resources: [
            { title: "Unreal Object handling — Garbage Collection", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-object-handling-in-unreal-engine", type: "doc" },
            { title: "Smart pointers & TObjectPtr", url: "https://dev.epicgames.com/documentation/unreal-engine/smart-pointers-in-unreal-engine", type: "doc" },
            { title: "C++ API: UObject", url: "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/CoreUObject/UObject", type: "doc" }
          ],
          exercises: [
            {
              id: "s1-m3-e1",
              title: "Keep an object alive correctly",
              kind: "exercise",
              difficulty: "medium",
              goal: "Experience GC behavior so you respect UPROPERTY ownership.",
              steps: [
                "Create a UObject-derived class and instantiate it with NewObject in your Actor.",
                "Store it once as a raw pointer (no UPROPERTY) and once as a UPROPERTY() TObjectPtr.",
                "Force GC (e.g. the obj gc command or wait) and observe which reference survives."
              ],
              acceptance: ["You can explain why the UPROPERTY-tracked reference survives GC and the raw one may not."],
              hints: ["The GC only follows references it knows about — i.e. UPROPERTY members and a few container/root mechanisms."]
            },
            {
              id: "s1-m3-e2",
              title: "Challenge: diagnose a dangling pointer",
              kind: "challenge",
              difficulty: "hard",
              goal: "Build instincts for the #1 source of UObject crashes.",
              steps: [
                "Deliberately store a UObject in a non-UPROPERTY member and use it after a GC pass.",
                "Reproduce the crash/assert and read the callstack.",
                "Fix it by adding UPROPERTY() and confirm stability."
              ],
              acceptance: ["You reproduced and then fixed a GC-related dangling-pointer issue intentionally."],
              hints: ["IsValid(Ptr) guards against pending-kill objects; combine with proper UPROPERTY ownership."]
            }
          ]
        },
        {
          id: "s1-m4",
          title: "Core types: containers, strings, logging",
          objectives: [
            "Use TArray, TMap, TSet instead of std:: containers.",
            "Choose between FString, FName and FText and convert safely.",
            "Log effectively with UE_LOG, on-screen debug messages and DrawDebug helpers."
          ],
          resources: [
            { title: "Containers (TArray / TMap / TSet)", url: "https://dev.epicgames.com/documentation/unreal-engine/containers-in-unreal-engine", type: "doc" },
            { title: "FString, FName, FText (string handling)", url: "https://dev.epicgames.com/documentation/unreal-engine/string-handling-in-unreal-engine", type: "doc" },
            { title: "Logging in Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/logging-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s1-m4-e1",
              title: "Build an inventory with TArray/TMap",
              kind: "exercise",
              difficulty: "medium",
              goal: "Get fluent with the everyday Unreal containers.",
              steps: [
                "Store an inventory as TArray<FItemData> (reusing your Stage 1 struct).",
                "Add a TMap<EItemRarity, int32> that counts items by rarity.",
                "Implement AddItem/RemoveItem and log the resulting counts with UE_LOG."
              ],
              acceptance: ["Adding/removing items keeps the TMap counts correct and logs cleanly."],
              hints: ["FString formatting: UE_LOG(LogTemp, Log, TEXT(\"Count: %d\"), Num);"]
            },
            {
              id: "s1-m4-e2",
              title: "Define your own log category",
              kind: "exercise",
              difficulty: "easy",
              goal: "Stop polluting LogTemp and learn the macro pair.",
              steps: [
                "Declare a category with DECLARE_LOG_CATEGORY_EXTERN in a header.",
                "Define it with DEFINE_LOG_CATEGORY in the matching cpp.",
                "Log inventory events through your new category at Verbose and Warning levels."
              ],
              acceptance: ["Your category appears in the Output Log and you can filter by it."],
              hints: ["Verbosity is filtered by the category's compiled-in and runtime level — try the 'log <Category> verbose' console command."]
            }
          ]
        },
        {
          id: "s1-m5",
          title: "Core math & transforms",
          objectives: [
            "Use FVector, FRotator, FQuat and FTransform fluently.",
            "Reason about world vs. local space and how parent/child transforms compose.",
            "Apply dot and cross products to everyday gameplay questions: facing, cones, left-or-right."
          ],
          resources: [
            { title: "Transforming Actors (locations, rotations, spaces)", url: "https://dev.epicgames.com/documentation/unreal-engine/transforming-actors-in-unreal-engine", type: "doc" },
            { title: "C++ API: TVector (the type behind FVector)", url: "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Core/TVector", type: "doc" },
            { title: "C++ API: FMath (math utilities)", url: "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Core/FMath", type: "doc" }
          ],
          exercises: [
            {
              id: "s1-m5-e1",
              title: "Look-at and facing checks",
              kind: "exercise",
              difficulty: "medium",
              goal: "Answer 'can this NPC see the player?' with raw vector math — no AI framework involved.",
              steps: [
                "Place two actors and compute the normalized direction from 'NPC' to player each frame.",
                "Dot it against the NPC's GetActorForwardVector() and compare with the cosine of a half-angle threshold.",
                "Log visible/not-visible and verify in PIE by walking a circle around the NPC."
              ],
              acceptance: [
                "The check flips at the expected angle (a 90° cone flips 45° to either side).",
                "You can explain why you compare against cos(threshold) instead of the angle itself."
              ],
              hints: ["The dot product of two unit vectors *is* the cosine of the angle between them — compare against FMath::Cos(FMath::DegreesToRadians(HalfAngle))."]
            },
            {
              id: "s1-m5-e2",
              title: "Challenge: spaces and parents",
              kind: "challenge",
              difficulty: "medium",
              goal: "Internalize how relative transforms compose into world transforms.",
              steps: [
                "Attach a child actor or component to a parent with a non-trivial relative location AND rotation.",
                "Predict the child's world location on paper from the parent transform and the relative values.",
                "Verify with DrawDebugCoordinateSystem (or logging GetActorTransform()), rotate the parent 90°, and predict again."
              ],
              acceptance: ["Your paper prediction matches the engine's world transform (within rounding) before and after rotating the parent."],
              hints: ["Composition order trips everyone: in UE notation ChildWorld = ChildRelative * ParentWorld — rotation of the parent moves the child."]
            }
          ]
        }
      ]
    },

    /* =====================================================================
     * STAGE 2 — GAMEPLAY FRAMEWORK
     * ===================================================================== */
    {
      id: "s2",
      title: "Gameplay Framework",
      level: "Intermediate",
      summary:
        "Build playable systems with Actors, Components, Pawns/Characters, Controllers, GameMode/GameState and Enhanced Input.",
      modules: [
        {
          id: "s2-m1",
          title: "Actors & Components",
          objectives: [
            "Compose behavior from Actors and ActorComponents/SceneComponents.",
            "Understand the Actor lifecycle: construction, OnConstruction, BeginPlay, Tick, EndPlay.",
            "Attach components and build a component hierarchy in C++."
          ],
          resources: [
            { title: "Actors in Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/actors-in-unreal-engine", type: "doc" },
            { title: "Components in Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/components-in-unreal-engine", type: "doc" },
            { title: "Actor lifecycle", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-actor-lifecycle", type: "doc" }
          ],
          exercises: [
            {
              id: "s2-m1-e1",
              title: "Build a pickup Actor",
              kind: "exercise",
              difficulty: "medium",
              goal: "Compose a real Actor from components in C++.",
              steps: [
                "Create an AActor with a UStaticMeshComponent root and a USphereComponent for overlap.",
                "Set the mesh and sphere radius in the constructor.",
                "On overlap, log who picked it up and Destroy() the actor."
              ],
              acceptance: ["The pickup shows its mesh, detects overlap and destroys itself on touch."],
              hints: ["Bind overlap with OnComponentBeginOverlap.AddDynamic in BeginPlay or the constructor."]
            },
            {
              id: "s2-m1-e2",
              title: "Extract a reusable component",
              kind: "challenge",
              difficulty: "medium",
              goal: "Practice composition over inheritance.",
              steps: [
                "Move the pickup's rotate-in-place behavior into a UActorComponent.",
                "Add the component to two different Actors.",
                "Expose its rotation speed as a UPROPERTY(EditAnywhere)."
              ],
              acceptance: ["Two unrelated Actors reuse the same component without code duplication."],
              hints: ["A component's TickComponent runs only if PrimaryComponentTick.bCanEverTick = true."]
            }
          ]
        },
        {
          id: "s2-m2",
          title: "Pawns, Characters & Controllers",
          objectives: [
            "Distinguish APawn, ACharacter, AController and APlayerController responsibilities.",
            "Understand possession and how input reaches a pawn.",
            "Use the CharacterMovementComponent for grounded movement."
          ],
          resources: [
            { title: "Pawn & Character", url: "https://dev.epicgames.com/documentation/unreal-engine/pawn-in-unreal-engine", type: "doc" },
            { title: "Player Controllers", url: "https://dev.epicgames.com/documentation/unreal-engine/player-controllers-in-unreal-engine", type: "doc" },
            { title: "Tom Looman — free 'Unreal Engine C++' course materials", url: "https://courses.tomlooman.com/p/unrealengine-cpp", type: "doc" }
          ],
          exercises: [
            {
              id: "s2-m2-e1",
              title: "A minimal C++ Pawn",
              kind: "exercise",
              difficulty: "medium",
              goal: "Understand possession and movement from the ground up.",
              steps: [
                "Create an APawn with a mesh, a spring arm and a camera.",
                "Have your GameMode set it as the DefaultPawnClass.",
                "Add simple forward/strafe movement via AddMovementInput (input wired in the next module)."
              ],
              acceptance: ["The player controller possesses your pawn and the camera follows it."],
              hints: ["AutoPossessPlayer = EAutoReceiveInput::Player0 is a quick way to test a single pawn."]
            },
            {
              id: "s2-m2-e2",
              title: "Tune the CharacterMovementComponent",
              kind: "exercise",
              difficulty: "easy",
              goal: "Learn where grounded movement behavior actually lives.",
              steps: [
                "Create an ACharacter subclass and, in the constructor, adjust GetCharacterMovement(): MaxWalkSpeed, JumpZVelocity, AirControl and crouched half-height.",
                "Enable crouching (NavAgentProps.bCanCrouch) and wire Crouch()/UnCrouch() to a key.",
                "Compare how the same level feels at two very different MaxWalkSpeed values."
              ],
              acceptance: ["Walk speed, jump and crouch all reflect your C++ values without touching Blueprints."],
              hints: ["Almost every movement question ('why does my character slide?') is answered by a UCharacterMovementComponent property — skim its header once."]
            },
            {
              id: "s2-m2-e3",
              title: "Challenge: sprint with stamina",
              kind: "challenge",
              difficulty: "medium",
              goal: "Combine input, movement tuning and per-frame state into one small system.",
              steps: [
                "Bind a Sprint input that raises MaxWalkSpeed while held.",
                "Drain a Stamina float while sprinting and regenerate it while not; clamp at 0..Max.",
                "Force sprint off at zero stamina and block re-sprint until a threshold is recovered."
              ],
              acceptance: [
                "Sprinting drains stamina, exhaustion cancels the sprint, and recovery gates re-sprinting.",
                "Speed changes go through the CharacterMovementComponent, not by moving the actor manually."
              ],
              hints: ["Store the walk/sprint speeds as UPROPERTY(EditAnywhere) so designers can tune them later."]
            }
          ]
        },
        {
          id: "s2-m3",
          title: "GameMode, GameState & the framework classes",
          objectives: [
            "Know what GameMode, GameState, PlayerState, HUD and GameInstance are each responsible for.",
            "Understand which classes are server-only vs. replicated to clients (preview of networking).",
            "Set default classes for a mode in C++."
          ],
          resources: [
            { title: "Game Mode and Game State", url: "https://dev.epicgames.com/documentation/unreal-engine/game-mode-and-game-state-in-unreal-engine", type: "doc" },
            { title: "Gameplay Framework quick reference", url: "https://dev.epicgames.com/documentation/unreal-engine/gameplay-framework-in-unreal-engine", type: "doc" },
            { title: "Alex Forsythe — The UE Game Framework: int main() → BeginPlay", url: "https://www.youtube.com/watch?v=IaU2Hue-ApI", type: "video" }
          ],
          exercises: [
            {
              id: "s2-m3-e1",
              title: "Wire up a custom GameMode",
              kind: "exercise",
              difficulty: "easy",
              goal: "Own the entry points of a play session.",
              steps: [
                "Create AMyGameMode in C++ and set DefaultPawnClass, PlayerControllerClass and GameStateClass in its constructor.",
                "Track a simple 'score' on the GameState.",
                "Log the score from the GameMode when it changes."
              ],
              acceptance: ["Your custom classes are used in PIE and score updates flow through the GameState."],
              hints: ["Score that all players should see belongs on GameState; per-player score belongs on PlayerState."]
            }
          ]
        },
        {
          id: "s2-m4",
          title: "Enhanced Input, Tick & Timers",
          objectives: [
            "Set up Input Actions and Input Mapping Contexts and bind them in C++.",
            "Decide between per-frame Tick and event-driven Timers.",
            "Use FTimerManager for delayed and repeating logic."
          ],
          resources: [
            { title: "Enhanced Input in Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/enhanced-input-in-unreal-engine", type: "doc" },
            { title: "Gameplay Timers (FTimerManager)", url: "https://dev.epicgames.com/documentation/unreal-engine/gameplay-timers-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s2-m4-e1",
              title: "Move and look with Enhanced Input",
              kind: "exercise",
              difficulty: "medium",
              goal: "Wire modern input from C++ end to end.",
              steps: [
                "Create Input Actions for Move (Axis2D) and Look (Axis2D) and an Input Mapping Context.",
                "Add the mapping context in your controller/pawn and bind the actions in SetupPlayerInputComponent.",
                "Drive AddMovementInput and AddControllerYaw/PitchInput from the bound handlers."
              ],
              acceptance: ["WASD + mouse move and rotate the pawn through Enhanced Input bindings."],
              hints: ["Add the IMC via the player's UEnhancedInputLocalPlayerSubsystem in BeginPlay."]
            },
            {
              id: "s2-m4-e2",
              title: "Challenge: timer vs. tick",
              kind: "challenge",
              difficulty: "medium",
              goal: "Stop overusing Tick.",
              steps: [
                "Implement a 'regenerate stamina every 0.5s' system using a repeating FTimerManager timer.",
                "Implement the same thing in Tick using an accumulator.",
                "Write a comment comparing CPU cost and readability of the two."
              ],
              acceptance: ["You can justify when a timer is preferable to Tick."],
              hints: ["A 2 Hz timer wakes up twice a second; a Tick implementation runs every frame and discards most of them."]
            }
          ]
        },
        {
          id: "s2-m5",
          title: "Collision, traces & physics",
          objectives: [
            "Run line traces and sweeps from C++ and read FHitResult correctly.",
            "Understand hit vs. overlap events and how channels, presets and responses interact.",
            "Apply forces and impulses to simulated bodies and reason about mass."
          ],
          resources: [
            { title: "Collision overview", url: "https://dev.epicgames.com/documentation/unreal-engine/collision-in-unreal-engine", type: "doc" },
            { title: "Traces with raycasts", url: "https://dev.epicgames.com/documentation/unreal-engine/traces-with-raycasts-in-unreal-engine", type: "doc" },
            { title: "Physics in Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/physics-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s2-m5-e1",
              title: "A hitscan interaction trace",
              kind: "exercise",
              difficulty: "medium",
              goal: "Own the single most-used gameplay query in the engine.",
              steps: [
                "Add a custom trace channel (Project Settings > Collision) and set sensible default responses.",
                "Each frame (or on a key), LineTraceSingleByChannel from the camera forward and draw the line with DrawDebugLine.",
                "On hit, log the actor, component and bone name from the FHitResult and mark the impact point with DrawDebugSphere."
              ],
              acceptance: [
                "The trace hits only what your channel says it should — you can make an actor invisible to it via its collision response.",
                "You can explain the difference between bBlockingHit and an overlap."
              ],
              hints: ["Pass FCollisionQueryParams with AddIgnoredActor(this) or you'll mostly hit yourself."]
            },
            {
              id: "s2-m5-e2",
              title: "Overlap-driven trigger zone",
              kind: "exercise",
              difficulty: "medium",
              goal: "Use overlap events idiomatically — the delegate signature is a rite of passage.",
              steps: [
                "Add a UBoxComponent set to 'Overlap' for pawns and bind OnComponentBeginOverlap/OnComponentEndOverlap with AddDynamic.",
                "Match the exact UFUNCTION signature (6 parameters for begin, 4 for end) — let the compiler teach you.",
                "Track who is inside the zone in a TSet and log enter/leave; ignore the owning actor."
              ],
              acceptance: ["Enter and leave both fire exactly once per pawn and the inside-set never drifts out of sync."],
              hints: ["Both components must have 'Generate Overlap Events' enabled and their responses must agree — one Block side downgrades the pair to a hit, not an overlap."]
            },
            {
              id: "s2-m5-e3",
              title: "Challenge: physics knockback",
              kind: "challenge",
              difficulty: "hard",
              goal: "Push simulated bodies around predictably.",
              steps: [
                "Place several StaticMeshActors with 'Simulate Physics' on and very different masses.",
                "On your interaction trace hit, AddImpulseAtLocation along the trace direction to the hit component.",
                "Compare the reaction with and without bVelChange (mass-independent impulse) and write a short comment on when each is right."
              ],
              acceptance: [
                "Light and heavy objects react differently with a plain impulse and identically with bVelChange.",
                "You can explain why applying the impulse at the hit location adds spin."
              ],
              hints: ["AddImpulse affects linear velocity; applying it off-center introduces torque — that's the spin you're seeing."]
            }
          ]
        },
        {
          id: "s2-m6",
          title: "The debugging toolbox",
          objectives: [
            "Choose between check, ensure and verify and know what each does in Shipping builds.",
            "Drive the engine with console variables and add your own from C++.",
            "Inspect live AI/gameplay state with the Gameplay Debugger and record it with the Visual Logger."
          ],
          resources: [
            { title: "Asserts (check / ensure / verify)", url: "https://dev.epicgames.com/documentation/unreal-engine/asserts-in-unreal-engine", type: "doc" },
            { title: "Console variables in C++", url: "https://dev.epicgames.com/documentation/unreal-engine/console-variables-cplusplus-in-unreal-engine", type: "doc" },
            { title: "Visual Logger", url: "https://dev.epicgames.com/documentation/unreal-engine/visual-logger-in-unreal-engine", type: "doc" },
            { title: "Gameplay Debugger", url: "https://dev.epicgames.com/documentation/unreal-engine/using-the-gameplay-debugger-in-unreal-engine", type: "doc" },
            { title: "GDB to LLDB command map (lldb.llvm.org)", url: "https://lldb.llvm.org/use/map.html", type: "doc" }
          ],
          exercises: [
            {
              id: "s2-m6-e1",
              title: "Instrument a bug",
              kind: "exercise",
              difficulty: "medium",
              goal: "Find a logic bug with engine tooling instead of a debugger.",
              steps: [
                "Seed a deliberate bug (e.g. your trigger zone's inside-set leaks an entry on leave).",
                "Guard the assumption with ensureMsgf so the first violation logs a callstack without crashing.",
                "Record a session with the Visual Logger (UE_VLOG the set size + positions each event) and find the exact moment it drifts."
              ],
              acceptance: [
                "The ensure fires once at the violation with a readable message and you can point at the broken event in the Visual Logger timeline.",
                "You can explain why this stayed check-free: ensure for 'should not happen', check for 'cannot continue'."
              ],
              hints: ["ensure fires only once per site by default — exactly what you want for a per-frame assumption."]
            },
            {
              id: "s2-m6-e2",
              title: "Your own CVar",
              kind: "exercise",
              difficulty: "easy",
              goal: "Make your debug drawing toggleable like the engine's own.",
              steps: [
                "Register a TAutoConsoleVariable<int32> (e.g. 'MyGame.Debug.Traces', default 0).",
                "Gate the DrawDebug calls from your trace exercise behind GetValueOnGameThread().",
                "Toggle it live from the ` console and from the command line with -ExecCmds."
              ],
              acceptance: ["Debug drawing switches on and off at runtime with no recompile."],
              hints: ["Console variables are found by prefix in the console — pick a consistent 'MyGame.' namespace now and keep it."]
            },
            {
              id: "s2-m6-e3",
              title: "Debug the engine under LLDB (Linux)",
              kind: "exercise",
              difficulty: "medium",
              goal: "Be as much at home in LLDB on Linux as in the Visual Studio debugger on Windows.",
              steps: [
                "Wire up Epic's pretty-printers: add command script import \"<EngineRoot>/Engine/Extras/LLDBDataFormatters/UEDataFormatters_2ByteChars.py\" to your ~/.lldbinit.",
                "Launch the editor under the debugger: lldb -- Engine/Binaries/Linux/UnrealEditor /absolute/path/To/YourGame.uproject (or attach to a running one with lldb -p <pid>).",
                "Set a breakpoint with b AYourCharacter::BeginPlay, run, and when it hits inspect members with frame variable — look at an FString and a TArray."
              ],
              acceptance: [
                "The breakpoint hits and frame variable shows the FString's actual text and the TArray's elements, not raw pointers.",
                "You can both launch under LLDB and attach to an already-running editor."
              ],
              hints: [
                "If FString shows only an opaque Data pointer, your .lldbinit didn't load — the formatters ship with the engine under Engine/Extras/LLDBDataFormatters.",
                "Coming from Visual Studio? Keep the GDB-to-LLDB command map open; any unique short form works (br se, fr v)."
              ]
            }
          ]
        }
      ]
    },

    /* =====================================================================
     * STAGE 3 — C++ <-> BLUEPRINT INTEGRATION
     * ===================================================================== */
    {
      id: "s3",
      title: "C++ ↔ Blueprint Integration",
      level: "Intermediate",
      summary:
        "Design C++ that designers love: expose the right surface to Blueprint with events, function libraries, interfaces, delegates and data assets.",
      modules: [
        {
          id: "s3-m1",
          title: "Blueprint-exposed events",
          objectives: [
            "Use BlueprintImplementableEvent and BlueprintNativeEvent correctly.",
            "Override C++ events from a Blueprint subclass.",
            "Know when logic belongs in C++ vs. exposed for Blueprint override."
          ],
          resources: [
            { title: "Blueprint/C++ — exposing gameplay elements", url: "https://dev.epicgames.com/documentation/unreal-engine/exposing-gameplay-elements-to-blueprints-visual-scripting-in-unreal-engine", type: "doc" },
            { title: "Blueprints and C++ — how they work together", url: "https://dev.epicgames.com/documentation/unreal-engine/blueprints-visual-scripting-in-unreal-engine", type: "doc" },
            { title: "Alex Forsythe — Blueprints vs. C++: How They Fit Together", url: "https://www.youtube.com/watch?v=VMZftEVDuCE", type: "video" }
          ],
          exercises: [
            {
              id: "s3-m1-e1",
              title: "Native event with a Blueprint override",
              kind: "exercise",
              difficulty: "medium",
              goal: "Give designers a hook with a sensible C++ default.",
              steps: [
                "Declare void OnPickedUp(); as a BlueprintNativeEvent.",
                "Provide a C++ default (OnPickedUp_Implementation) that logs.",
                "Override it in a Blueprint subclass to spawn a particle/sound."
              ],
              acceptance: ["Both the C++ default and the Blueprint override fire as expected."],
              hints: ["BlueprintNativeEvent = C++ default + optional BP override; BlueprintImplementableEvent = BP-only, no C++ body."]
            }
          ]
        },
        {
          id: "s3-m2",
          title: "Function libraries & UInterfaces",
          objectives: [
            "Create a UBlueprintFunctionLibrary of reusable static helpers.",
            "Define and implement a UInterface for cross-class contracts.",
            "Call interface functions safely from C++ and Blueprint."
          ],
          resources: [
            { title: "Blueprint Function Libraries", url: "https://dev.epicgames.com/documentation/unreal-engine/blueprint-function-libraries-in-unreal-engine", type: "doc" },
            { title: "Interfaces in Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/interfaces-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s3-m2-e1",
              title: "An IInteractable interface",
              kind: "exercise",
              difficulty: "medium",
              goal: "Decouple 'who can be interacted with' from concrete classes.",
              steps: [
                "Define UInteractable (UINTERFACE) with an Interact(AActor* Instigator) BlueprintNativeEvent.",
                "Implement it on your pickup and on a door Actor.",
                "From the player, line-trace forward and call Interact on whatever hit implements the interface."
              ],
              acceptance: ["A single interaction code path works for multiple unrelated Actor types."],
              hints: ["Check with Cast<IInteractable>() or Implements<UInteractable>() and call via Execute_Interact()."]
            },
            {
              id: "s3-m2-e2",
              title: "Challenge: a math/util function library",
              kind: "challenge",
              difficulty: "easy",
              goal: "Share helpers between C++ and Blueprint.",
              steps: [
                "Create a UBlueprintFunctionLibrary with 2–3 BlueprintPure static helpers (e.g. a remap, a weighted random).",
                "Call one from C++ and the same one from a Blueprint graph.",
                "Add a meaningful Category so they group in the palette."
              ],
              acceptance: ["The helpers are callable from both C++ and Blueprint."],
              hints: ["Static + BlueprintCallable/BlueprintPure is the whole recipe."]
            }
          ]
        },
        {
          id: "s3-m3",
          title: "Delegates, events & data assets",
          objectives: [
            "Choose between single/multicast/dynamic delegates and broadcast events.",
            "Let Blueprints bind to C++ events.",
            "Drive content from UDataAsset / DataTable instead of hard-coded values."
          ],
          resources: [
            { title: "Delegates and Events", url: "https://dev.epicgames.com/documentation/unreal-engine/delegates-and-lambda-functions-in-unreal-engine", type: "doc" },
            { title: "Data Assets", url: "https://dev.epicgames.com/documentation/unreal-engine/data-assets-in-unreal-engine", type: "doc" },
            { title: "Data Driven Gameplay (Data Tables)", url: "https://dev.epicgames.com/documentation/unreal-engine/data-driven-gameplay-elements-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s3-m3-e1",
              title: "Broadcast a health-changed event",
              kind: "exercise",
              difficulty: "medium",
              goal: "Let UI/Blueprint react to C++ state changes without polling.",
              steps: [
                "Declare a DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam OnHealthChanged on a Health component.",
                "Broadcast it whenever health changes.",
                "Bind to it in a Blueprint (or UMG widget) to update a bar."
              ],
              acceptance: ["Changing health in C++ updates a Blueprint-side listener via the delegate."],
              hints: ["Dynamic multicast delegates are the ones Blueprints can bind to."]
            },
            {
              id: "s3-m3-e2",
              title: "Drive items from a DataTable",
              kind: "challenge",
              difficulty: "medium",
              goal: "Move tuning data out of code.",
              steps: [
                "Make your FItemData a FTableRowBase and create a DataTable asset of items.",
                "Look rows up by FName at runtime to spawn pickups.",
                "Add a new item by editing the DataTable only — no recompile."
              ],
              acceptance: ["You added a new item with zero code changes."],
              hints: ["FDataTableRowHandle lets designers pick a row in the Details panel."]
            }
          ]
        }
      ]
    },

    /* =====================================================================
     * STAGE 4 — GAMEPLAY SYSTEMS & ARCHITECTURE
     * ===================================================================== */
    {
      id: "s4",
      title: "Gameplay Systems & Architecture",
      level: "Advanced",
      summary:
        "Assemble large systems: the Gameplay Ability System, networking/replication, Subsystems, AI (Behavior Trees / StateTree) and C++ animation.",
      modules: [
        {
          id: "s4-m1",
          title: "Gameplay Ability System (GAS) & Gameplay Tags",
          objectives: [
            "Understand AbilitySystemComponent, Attributes, Gameplay Effects and Gameplay Abilities.",
            "Model state with hierarchical Gameplay Tags instead of booleans.",
            "Grant and activate an ability in C++."
          ],
          resources: [
            { title: "Gameplay Ability System overview", url: "https://dev.epicgames.com/documentation/unreal-engine/gameplay-ability-system-for-unreal-engine", type: "doc" },
            { title: "Gameplay Tags", url: "https://dev.epicgames.com/documentation/unreal-engine/using-gameplay-tags-in-unreal-engine", type: "doc" },
            { title: "tranek/GASDocumentation (community deep-dive)", url: "https://github.com/tranek/GASDocumentation", type: "repo" },
            { title: "Epic — Your First 60 Minutes with Gameplay Ability System", url: "https://dev.epicgames.com/community/learning/tutorials/8Xn9/unreal-engine-epic-for-indies-your-first-60-minutes-with-gameplay-ability-system", type: "video" }
          ],
          exercises: [
            {
              id: "s4-m1-e1",
              title: "Health/Mana attribute set",
              kind: "exercise",
              difficulty: "hard",
              goal: "Stand up the core of GAS.",
              steps: [
                "Add an AbilitySystemComponent and a UAttributeSet with Health/MaxHealth.",
                "Apply a Gameplay Effect that reduces Health (a 'damage' effect).",
                "Clamp Health in PostGameplayEffectExecute and broadcast a change event."
              ],
              acceptance: ["Applying the damage effect reduces clamped Health and notifies listeners."],
              hints: ["Use the ATTRIBUTE_ACCESSORS macro pattern from the GAS docs to declare attributes cleanly."]
            },
            {
              id: "s4-m1-e2",
              title: "Challenge: a tag-gated ability",
              kind: "challenge",
              difficulty: "hard",
              goal: "Use tags to block/allow actions.",
              steps: [
                "Create a GameplayAbility (e.g. Dash) granted at BeginPlay.",
                "Block activation while a State.Stunned tag is present using activation-blocked tags.",
                "Apply a temporary stun effect that grants the tag and confirm Dash is blocked."
              ],
              acceptance: ["Dash works normally but is blocked while stunned, with no boolean flags in your code."],
              hints: ["Ability tags: ActivationBlockedTags / ActivationRequiredTags drive this declaratively."]
            }
          ]
        },
        {
          id: "s4-m2",
          title: "Networking & replication fundamentals",
          objectives: [
            "Understand the server-authoritative model: roles, ownership and the cost of replication.",
            "Replicate properties with GetLifetimeReplicatedProps and RepNotify.",
            "Call Server/Client/NetMulticast RPCs correctly."
          ],
          resources: [
            { title: "Networking and Multiplayer overview", url: "https://dev.epicgames.com/documentation/unreal-engine/networking-and-multiplayer-in-unreal-engine", type: "doc" },
            { title: "Property replication", url: "https://dev.epicgames.com/documentation/unreal-engine/replicate-actor-properties-in-unreal-engine", type: "doc" },
            { title: "RPCs (Remote Procedure Calls)", url: "https://dev.epicgames.com/documentation/unreal-engine/remote-procedure-calls-in-unreal-engine", type: "doc" },
            { title: "Alex Forsythe — Multiplayer in UE: How to Understand Network Replication", url: "https://www.youtube.com/watch?v=JOJP0CvpB8w", type: "video" }
          ],
          exercises: [
            {
              id: "s4-m2-e1",
              title: "Replicate health to clients",
              kind: "exercise",
              difficulty: "hard",
              goal: "See server authority and RepNotify in action.",
              steps: [
                "Mark Health as Replicated with a RepNotify (ReplicatedUsing=OnRep_Health).",
                "Add it to GetLifetimeReplicatedProps.",
                "Run with 2 clients (Net Mode: Play As Listen Server) and confirm damage on the server updates both clients' UI via OnRep_Health."
              ],
              acceptance: ["Health changes on the server propagate to clients and trigger OnRep_Health."],
              hints: ["Set bReplicates = true on the Actor; RepNotify only fires on clients (and on the server if you call it yourself)."]
            },
            {
              id: "s4-m2-e2",
              title: "Challenge: a Server RPC for an action",
              kind: "challenge",
              difficulty: "hard",
              goal: "Route a client-initiated action through the server authoritatively.",
              steps: [
                "Add a Server RPC (UFUNCTION(Server, Reliable) Server_Fire()).",
                "Validate input on the server and spawn a replicated projectile there.",
                "Confirm clients can't spawn projectiles directly (authority check)."
              ],
              acceptance: ["Only the server spawns the projectile; clients see it replicate in."],
              hints: ["Guard server-only logic with HasAuthority()."]
            }
          ]
        },
        {
          id: "s4-m3",
          title: "Subsystems",
          objectives: [
            "Pick the right Subsystem type: Game Instance, World, Local Player, Engine.",
            "Replace Blueprint 'manager' singletons with Subsystems.",
            "Understand Subsystem lifetimes vs. Actor lifetimes."
          ],
          resources: [
            { title: "Programming Subsystems", url: "https://dev.epicgames.com/documentation/unreal-engine/programming-subsystems-in-unreal-engine", type: "doc" },
            { title: "C++ API: USubsystem", url: "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Engine/USubsystem", type: "doc" }
          ],
          exercises: [
            {
              id: "s4-m3-e1",
              title: "A save/settings GameInstanceSubsystem",
              kind: "exercise",
              difficulty: "medium",
              goal: "Hold persistent, globally-accessible state cleanly.",
              steps: [
                "Create a UGameInstanceSubsystem that holds a few persistent settings.",
                "Access it from anywhere via GetGameInstance()->GetSubsystem<...>().",
                "Confirm it survives a level change (unlike Actors)."
              ],
              acceptance: ["State stored in the subsystem persists across a map travel."],
              hints: ["Choose World subsystem for per-level state, GameInstance for cross-level state."]
            },
            {
              id: "s4-m3-e2",
              title: "A WorldSubsystem score tracker",
              kind: "exercise",
              difficulty: "medium",
              goal: "Feel the lifetime difference between World and GameInstance subsystems.",
              steps: [
                "Create a UWorldSubsystem that tracks a per-level score and logs it in Deinitialize.",
                "Bump the score from gameplay (e.g. your pickup actor) via GetWorld()->GetSubsystem<...>().",
                "Travel to another map and observe: the world subsystem resets, your GameInstance subsystem from the previous exercise doesn't."
              ],
              acceptance: ["You can state precisely when each subsystem type is created and torn down."],
              hints: ["Override ShouldCreateSubsystem to keep editor preview worlds from spawning one too."]
            }
          ]
        },
        {
          id: "s4-m4",
          title: "AI: Behavior Trees, EQS & StateTree",
          objectives: [
            "Run an AI with an AIController, Behavior Tree and Blackboard.",
            "Write a custom BTTask/BTService in C++.",
            "Know when StateTree is a better fit than a Behavior Tree."
          ],
          resources: [
            { title: "Behavior Trees", url: "https://dev.epicgames.com/documentation/unreal-engine/behavior-trees-in-unreal-engine", type: "doc" },
            { title: "Environment Query System (EQS)", url: "https://dev.epicgames.com/documentation/unreal-engine/environment-query-system-in-unreal-engine", type: "doc" },
            { title: "StateTree", url: "https://dev.epicgames.com/documentation/unreal-engine/state-tree-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s4-m4-e1",
              title: "Patrol → chase AI",
              kind: "exercise",
              difficulty: "hard",
              goal: "Build a complete simple AI loop.",
              steps: [
                "Create an AIController that runs a Behavior Tree with a Blackboard.",
                "Patrol between points; on sight (AIPerception), set a TargetActor key and chase.",
                "Write one custom BTTask in C++ (e.g. ChooseNextPatrolPoint)."
              ],
              acceptance: ["The AI patrols, detects the player, chases, and your C++ task drives patrol selection."],
              hints: ["Use AIPerceptionComponent with Sight sense; write back to the Blackboard from the perception callback."]
            },
            {
              id: "s4-m4-e2",
              title: "A custom BTTask in C++",
              kind: "exercise",
              difficulty: "medium",
              goal: "Stop treating Behavior Tree nodes as Blueprint-only.",
              steps: [
                "Subclass UBTTaskNode and override ExecuteTask (return InProgress for latent work, Succeeded/Failed otherwise).",
                "Read and write Blackboard keys through the OwnerComp's BlackboardComponent.",
                "Give the node a sensible description via GetStaticDescription so it reads well in the tree editor."
              ],
              acceptance: ["Your node appears in the BT editor, runs, and its result visibly steers the tree."],
              hints: ["For latent tasks, store state on the node *instance memory* (GetNodeMemory), not on the node object — one node object serves many agents."]
            },
            {
              id: "s4-m4-e3",
              title: "An EQS query for flee points",
              kind: "exercise",
              difficulty: "hard",
              goal: "Use EQS for spatial reasoning instead of hand-rolled loops.",
              steps: [
                "Create an EQS query: a grid or donut generator around the querier.",
                "Score items with Distance (to threat, inverse) and Trace (line of sight to threat) tests.",
                "Run it from the Behavior Tree (Run EQS Query node) into a Blackboard vector key and have the AI flee there."
              ],
              acceptance: ["The AI picks points away from and out of sight of the threat; you can visualize scores with the EQS testing pawn."],
              hints: ["Enable the EQS testing pawn in editor preferences (experimental) to debug scoring in the level."]
            }
          ]
        },
        {
          id: "s4-m5",
          title: "Animation in C++",
          objectives: [
            "Drive an AnimInstance from C++ (UAnimInstance / NativeUpdateAnimation).",
            "Feed gameplay state (speed, isFalling) into the AnimBP via C++.",
            "Understand AnimNotifies and where C++ fits vs. the AnimBP graph."
          ],
          resources: [
            { title: "Animation Blueprints", url: "https://dev.epicgames.com/documentation/unreal-engine/animation-blueprints-in-unreal-engine", type: "doc" },
            { title: "C++ API: UAnimInstance", url: "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Engine/UAnimInstance", type: "doc" },
            { title: "Animation Notifies", url: "https://dev.epicgames.com/documentation/unreal-engine/animation-notifies-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s4-m5-e1",
              title: "A native AnimInstance",
              kind: "exercise",
              difficulty: "medium",
              goal: "Compute animation inputs in C++ for performance and clarity.",
              steps: [
                "Subclass UAnimInstance in C++ and override NativeUpdateAnimation.",
                "Expose Speed and bIsInAir as BlueprintReadOnly UPROPERTYs.",
                "Use them to drive a blendspace/state machine in the AnimBP that derives from your class."
              ],
              acceptance: ["Locomotion animation responds to values your C++ AnimInstance computes."],
              hints: ["Cache the owning pawn once in NativeInitializeAnimation; read velocity each update."]
            },
            {
              id: "s4-m5-e2",
              title: "Anim notifies into gameplay",
              kind: "exercise",
              difficulty: "medium",
              goal: "Let animation timing drive gameplay events instead of guessing with timers.",
              steps: [
                "Subclass UAnimNotify in C++ and override Notify (it receives the mesh and the sequence).",
                "Place your notify on the footstep frames of a walk/run animation.",
                "In Notify, route into gameplay: trace down from the foot and log/play the surface that was hit."
              ],
              acceptance: ["Footstep events fire exactly on the animation frames where you placed the notify, in sync at any play rate."],
              hints: ["The notify object is shared between all meshes playing the animation — keep it stateless and act on the MeshComp parameter."]
            }
          ]
        },
        {
          id: "s4-m6",
          title: "Asset references & async loading",
          objectives: [
            "Know what a hard reference costs and when a soft reference is the right call.",
            "Load assets on demand with TSoftObjectPtr/TSoftClassPtr and FStreamableManager.",
            "Understand what the Asset Manager and primary assets add on top."
          ],
          resources: [
            { title: "Referencing assets (hard vs. soft)", url: "https://dev.epicgames.com/documentation/unreal-engine/referencing-assets-in-unreal-engine", type: "doc" },
            { title: "Asynchronous asset loading", url: "https://dev.epicgames.com/documentation/unreal-engine/asynchronous-asset-loading-in-unreal-engine", type: "doc" },
            { title: "Asset Management (Asset Manager, primary assets)", url: "https://dev.epicgames.com/documentation/unreal-engine/asset-management-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s4-m6-e1",
              title: "Soft-load an item's mesh",
              kind: "exercise",
              difficulty: "medium",
              goal: "Stop paying load-time and memory for assets you might never show.",
              steps: [
                "Change your DataTable item row's mesh from UStaticMesh* to TSoftObjectPtr<UStaticMesh>.",
                "Request it via FStreamableManager::RequestAsyncLoad and apply the mesh in the completion delegate.",
                "Log load begin/end and confirm the frame doesn't hitch even for a large mesh."
              ],
              acceptance: [
                "The mesh appears shortly after the request with no game-thread hitch.",
                "You can articulate what would have happened with a hard UStaticMesh* reference instead."
              ],
              hints: ["Get the streamable manager from UAssetManager::GetStreamableManager() — and keep the returned handle alive or the load can be cancelled."]
            },
            {
              id: "s4-m6-e2",
              title: "Challenge: audit your reference graph",
              kind: "challenge",
              difficulty: "hard",
              goal: "See the memory cost of careless references with the engine's own tools.",
              steps: [
                "Pick a Blueprint or data asset and open it in the Reference Viewer; follow what referencing it pulls in.",
                "Open Size Map on the same asset and find the biggest transitive dependency.",
                "Break one accidental hard chain (convert to a soft reference or restructure) and confirm the Size Map shrinks."
              ],
              acceptance: ["Before/after Size Map screenshots (or numbers) showing the dependency you removed."],
              hints: ["Common offenders: a character BP hard-referencing every skin, or a DataTable row pointing at full meshes instead of soft refs."]
            }
          ]
        },
        {
          id: "s4-m7",
          title: "Saving & serialization",
          objectives: [
            "Persist progress with USaveGame and the SaveGame UPROPERTY flag.",
            "Use the synchronous and async SaveGameToSlot/LoadGameFromSlot APIs appropriately.",
            "Know what FArchive is underneath and plan for save versioning."
          ],
          resources: [
            { title: "Saving and loading your game", url: "https://dev.epicgames.com/documentation/unreal-engine/saving-and-loading-your-game-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s4-m7-e1",
              title: "Save/load the inventory",
              kind: "exercise",
              difficulty: "medium",
              goal: "Round-trip real gameplay state to disk, then stop blocking on it.",
              steps: [
                "Create a USaveGame subclass holding your Stage 1 inventory (mark the fields SaveGame).",
                "Save on demand with UGameplayStatics::SaveGameToSlot and restore it on startup from your GameInstance subsystem.",
                "Switch to AsyncSaveGameToSlot/AsyncLoadGameFromSlot with completion delegates and add a save-version int you check on load."
              ],
              acceptance: [
                "Quitting and restarting PIE restores the exact inventory.",
                "Loading an old/missing save degrades gracefully instead of crashing — the version field is checked."
              ],
              hints: ["A saved game is just serialized UPROPERTYs — renaming a property orphans its old data, which is why versioning matters from day one."]
            }
          ]
        },
        {
          id: "s4-m8",
          title: "Levels, streaming & travel",
          objectives: [
            "Choose between OpenLevel, seamless travel and streaming sublevels.",
            "Stream a level in and out from C++ and react to its load state.",
            "Know what World Partition automates and what actor lifetime means across travel."
          ],
          resources: [
            { title: "Level streaming", url: "https://dev.epicgames.com/documentation/unreal-engine/level-streaming-in-unreal-engine", type: "doc" },
            { title: "World Partition", url: "https://dev.epicgames.com/documentation/unreal-engine/world-partition-in-unreal-engine", type: "doc" },
            { title: "Travelling in multiplayer", url: "https://dev.epicgames.com/documentation/unreal-engine/travelling-in-multiplayer-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s4-m8-e1",
              title: "Challenge: persist across travel",
              kind: "challenge",
              difficulty: "hard",
              goal: "Learn the hard boundary between what travel destroys and what survives.",
              steps: [
                "Put state in three places: on an Actor, in a UWorldSubsystem, and in your GameInstance subsystem.",
                "Travel between two maps (OpenLevel, then ServerTravel in a 2-player PIE session) and log what survived each time.",
                "Write a short summary: which travel type tore down what, and where must cross-map state live."
              ],
              acceptance: [
                "A table (comment or note) mapping each storage location to its fate under OpenLevel vs. ServerTravel.",
                "Cross-map state ends up in the GameInstance (or PlayerState with seamless travel) — and you can say why."
              ],
              hints: ["Seamless travel can carry specific actors over via AGameModeBase::GetSeamlessTravelActorList — that's the exception that proves the rule."]
            }
          ]
        }
      ]
    },

    /* =====================================================================
     * STAGE 5 — ENGINE INTERNALS & PERFORMANCE
     * ===================================================================== */
    {
      id: "s5",
      title: "Engine Internals & Performance",
      level: "Advanced",
      summary:
        "Go under the hood: memory management, multithreading, profiling with Unreal Insights, and building UI in C++ with Slate/UMG.",
      modules: [
        {
          id: "s5-m1",
          title: "Memory management deep-dive",
          objectives: [
            "Use TWeakObjectPtr, TSharedPtr/TSharedRef and TUniquePtr appropriately.",
            "Distinguish UObject GC memory from raw/non-UObject allocations.",
            "Avoid common leaks and use-after-free patterns."
          ],
          resources: [
            { title: "Unreal Smart Pointer Library", url: "https://dev.epicgames.com/documentation/unreal-engine/smart-pointers-in-unreal-engine", type: "doc" },
            { title: "Memory management & GC (object handling)", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-object-handling-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s5-m1-e1",
              title: "Choose the right pointer",
              kind: "exercise",
              difficulty: "hard",
              goal: "Match ownership semantics to the right smart pointer.",
              steps: [
                "Hold a non-owning reference to a UObject that may be destroyed with TWeakObjectPtr and guard with IsValid.",
                "Manage a non-UObject helper's lifetime with TUniquePtr.",
                "Share a non-UObject resource with TSharedPtr and observe the ref count."
              ],
              acceptance: ["You can state, for each case, why that pointer type is correct."],
              hints: ["Never use TSharedPtr for UObjects — the GC owns those; use UPROPERTY/TObjectPtr/TWeakObjectPtr instead."]
            }
          ]
        },
        {
          id: "s5-m2",
          title: "Multithreading & async",
          objectives: [
            "Run work off the game thread with FRunnable, the Task Graph or Async().",
            "Marshal results safely back to the game thread.",
            "Understand what is and isn't thread-safe to touch (UObjects, rendering)."
          ],
          resources: [
            { title: "Tasks System / async programming", url: "https://dev.epicgames.com/documentation/unreal-engine/tasks-systems-in-unreal-engine", type: "doc" },
            { title: "Multi-threading & FRunnable (C++ API: FRunnable)", url: "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Core/FRunnable", type: "doc" }
          ],
          exercises: [
            {
              id: "s5-m2-e1",
              title: "Offload heavy work",
              kind: "exercise",
              difficulty: "hard",
              goal: "Keep the frame rate stable while doing expensive work.",
              steps: [
                "Do an artificially heavy computation (e.g. big procedural calc) on the game thread and watch the hitch.",
                "Move it to AsyncTask / the Task Graph.",
                "Apply the result back on the game thread (AsyncTask(ENamedThreads::GameThread, ...))."
              ],
              acceptance: ["The hitch disappears and the result is applied safely on the game thread."],
              hints: ["Don't touch UObjects/Actors from a worker thread — compute plain data, then apply on the game thread."]
            },
            {
              id: "s5-m2-e2",
              title: "A UE::Tasks pipeline",
              kind: "exercise",
              difficulty: "medium",
              goal: "Use the modern Tasks System instead of raw threads for dependent work.",
              steps: [
                "Rewrite the previous exercise with UE::Tasks::Launch returning a TTask.",
                "Chain a second task that consumes the first one's result via prerequisites (Launch with the first task as a prerequisite, or Then-style continuation).",
                "Busy-wait nowhere: collect the final result on the game thread without blocking it."
              ],
              acceptance: ["Two dependent pieces of work run off-thread in order, and the game thread never stalls waiting."],
              hints: ["Prefer UE::Tasks over FRunnable for almost everything — FRunnable is for long-lived dedicated threads (e.g. a socket listener), tasks are for units of work."]
            }
          ]
        },
        {
          id: "s5-m3",
          title: "Profiling with Unreal Insights",
          objectives: [
            "Capture and read a trace with Unreal Insights.",
            "Use stat commands (stat unit, stat game, stat gpu) to localize a bottleneck.",
            "Add named scopes with TRACE_CPUPROFILER_EVENT_SCOPE / SCOPE_CYCLE_COUNTER."
          ],
          resources: [
            { title: "Unreal Insights", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-insights-in-unreal-engine", type: "doc" },
            { title: "Stat commands", url: "https://dev.epicgames.com/documentation/unreal-engine/stat-commands-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s5-m3-e1",
              title: "Find and fix a hitch",
              kind: "challenge",
              difficulty: "hard",
              goal: "Practice the measure-before-optimizing discipline.",
              steps: [
                "Introduce an expensive operation in Tick on purpose.",
                "Capture a trace in Unreal Insights and locate the cost.",
                "Add a SCOPE_CYCLE_COUNTER around your code, optimize it, and confirm the improvement in a second trace."
              ],
              acceptance: ["You localized a cost with a trace and verified the fix with a second capture."],
              hints: ["stat unit first to see if you're game-thread, render-thread or GPU bound."]
            }
          ]
        },
        {
          id: "s5-m4",
          title: "UI in C++: UMG & Slate",
          objectives: [
            "Build a UUserWidget-backed HUD and bind it to C++ data.",
            "Understand where Slate sits beneath UMG.",
            "Construct a simple Slate widget in C++."
          ],
          resources: [
            { title: "UMG UI Designer", url: "https://dev.epicgames.com/documentation/unreal-engine/creating-user-interfaces-with-umg-and-slate-in-unreal-engine", type: "doc" },
            { title: "Slate UI programming framework", url: "https://dev.epicgames.com/documentation/unreal-engine/slate-user-interface-programming-framework-for-unreal-engine", type: "doc" },
            { title: "benui — Unreal UI articles (community)", url: "https://benui.ca/unreal/", type: "doc" },
            { title: "CommonUI plugin", url: "https://dev.epicgames.com/documentation/unreal-engine/common-ui-plugin-for-advanced-user-interfaces-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s5-m4-e1",
              title: "A health bar bound to C++",
              kind: "exercise",
              difficulty: "medium",
              goal: "Connect gameplay state to UMG cleanly.",
              steps: [
                "Create a UUserWidget subclass in C++ with a BindWidget UProgressBar.",
                "Update the bar from the OnHealthChanged delegate you built in Stage 3.",
                "Add it to the viewport from your HUD/controller."
              ],
              acceptance: ["The on-screen bar tracks health changes via the delegate (no Tick polling)."],
              hints: ["UPROPERTY(meta=(BindWidget)) links a C++ pointer to a widget of the same name in the WBP."]
            },
            {
              id: "s5-m4-e2",
              title: "CommonUI activatable screens",
              kind: "exercise",
              difficulty: "hard",
              goal: "Structure menus the way shipping 5.x games do.",
              steps: [
                "Enable the CommonUI plugin and set the CommonUI input settings (input action data, default navigation).",
                "Build a UCommonActivatableWidget-based pause menu pushed onto a UCommonActivatableWidgetStack.",
                "Verify input routing: gameplay input stops while the menu is active and resumes when it deactivates, with gamepad focus handled for free."
              ],
              acceptance: ["Opening/closing the menu cleanly swaps input between game and UI without manual SetInputMode juggling."],
              hints: ["CommonUI's value is the activatable stack + input routing — resist mixing it with raw AddToViewport menus."]
            }
          ]
        }
      ]
    },

    /* =====================================================================
     * STAGE 6 — TOOLING, PLUGINS & EDITOR EXTENSION
     * ===================================================================== */
    {
      id: "s6",
      title: "Tooling, Plugins & Editor Extension",
      level: "Expert",
      summary:
        "Extend the editor itself: author plugins and modules, customize the Details panel, add editor utilities and custom asset types, and run commandlets.",
      modules: [
        {
          id: "s6-m1",
          title: "Plugins & modules",
          objectives: [
            "Create a plugin with runtime and editor modules.",
            "Understand module loading phases and dependencies in .uplugin/.Build.cs.",
            "Gate editor-only code with WITH_EDITOR."
          ],
          resources: [
            { title: "Plugins in Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/plugins-in-unreal-engine", type: "doc" },
            { title: "Gameplay modules / module setup", url: "https://dev.epicgames.com/documentation/unreal-engine/gameplay-modules-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s6-m1-e1",
              title: "Author a plugin with two modules",
              kind: "exercise",
              difficulty: "hard",
              goal: "Package functionality so it's reusable across projects.",
              steps: [
                "Create a plugin via the editor with a Runtime module and an Editor module.",
                "Expose one runtime function and one editor-only function.",
                "Verify the editor module isn't compiled into a packaged build."
              ],
              acceptance: ["The plugin builds, and editor-only code is excluded from a packaged game."],
              hints: ["Set the editor module's Type to 'Editor' and LoadingPhase appropriately in the .uplugin."]
            }
          ]
        },
        {
          id: "s6-m2",
          title: "Editor utilities & Details customization",
          objectives: [
            "Build Editor Utility Widgets / Blueprints to automate workflows.",
            "Write a custom IDetailCustomization for a class's Details panel.",
            "Add a toolbar/menu button via a module's StartupModule."
          ],
          resources: [
            { title: "Editor Utility Widgets", url: "https://dev.epicgames.com/documentation/unreal-engine/editor-utility-widgets-in-unreal-engine", type: "doc" },
            { title: "Details panel customization", url: "https://dev.epicgames.com/documentation/unreal-engine/details-panel-customizations-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s6-m2-e1",
              title: "Customize a Details panel",
              kind: "challenge",
              difficulty: "hard",
              goal: "Improve designer ergonomics for one of your classes.",
              steps: [
                "Register an IDetailCustomization for one of your Actor/component classes.",
                "Add a custom button row that runs a C++ action on the selected object.",
                "Hide or reorder a couple of default properties."
              ],
              acceptance: ["Selecting your class shows the customized panel with a working action button."],
              hints: ["Register via FPropertyEditorModule::RegisterCustomClassLayout in your editor module's StartupModule."]
            }
          ]
        },
        {
          id: "s6-m3",
          title: "Custom assets & commandlets",
          objectives: [
            "Define a custom UObject asset type with a factory and asset actions.",
            "Write a UCommandlet for headless/batch processing.",
            "Automate content operations from the command line."
          ],
          resources: [
            { title: "Asset Registry", url: "https://dev.epicgames.com/documentation/unreal-engine/asset-registry-in-unreal-engine", type: "doc" },
            { title: "Commandlets (C++ API: UCommandlet)", url: "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Engine/UCommandlet", type: "doc" }
          ],
          exercises: [
            {
              id: "s6-m3-e1",
              title: "A batch-processing commandlet",
              kind: "challenge",
              difficulty: "hard",
              goal: "Do content work without opening the full editor.",
              steps: [
                "Write a UCommandlet that scans the Asset Registry for a class of assets.",
                "Log a report (counts, names) to the console.",
                "Run it via UnrealEditor-Cmd.exe <Project> -run=<YourCommandlet>."
              ],
              acceptance: ["The commandlet runs headless and produces a correct report."],
              hints: ["Override Main(const FString& Params) and return 0 on success."]
            }
          ]
        },
        {
          id: "s6-m4",
          title: "Automation testing",
          objectives: [
            "Write unit-style tests with IMPLEMENT_SIMPLE_AUTOMATION_TEST and BDD-style specs with DEFINE_SPEC.",
            "Build map-based functional tests for gameplay-level behavior.",
            "Run tests from the Session Frontend and headlessly from the command line (CI-ready)."
          ],
          resources: [
            { title: "Automation Test Framework", url: "https://dev.epicgames.com/documentation/unreal-engine/automation-test-framework-in-unreal-engine", type: "doc" },
            { title: "Automation spec (BDD-style tests)", url: "https://dev.epicgames.com/documentation/unreal-engine/automation-spec-in-unreal-engine", type: "doc" },
            { title: "Functional testing (map-based)", url: "https://dev.epicgames.com/documentation/unreal-engine/functional-testing-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s6-m4-e1",
              title: "Unit-test a function library",
              kind: "exercise",
              difficulty: "medium",
              goal: "Put a safety net under code you actually wrote.",
              steps: [
                "Write IMPLEMENT_SIMPLE_AUTOMATION_TEST cases for your Stage 3 math/util function library, including edge cases that once surprised you.",
                "Run them filtered in Window > Test Automation (Session Frontend) and make one fail to see the report.",
                "Run the same tests headless: UnrealEditor-Cmd.exe <Project> -ExecCmds=\"Automation RunTests <YourPrefix>\" -unattended -nopause."
              ],
              acceptance: [
                "Tests pass in the Session Frontend and from the command line with a parseable result.",
                "A deliberately broken implementation is caught by at least one test."
              ],
              hints: ["Pick the right flags: EAutomationTestFlags::EditorContext | SmokeFilter runs fast and everywhere; keep slow tests out of the smoke set."]
            }
          ]
        }
      ]
    },

    /* =====================================================================
     * STAGE 7 — EXPERT PRACTICE & CAPSTONE
     * ===================================================================== */
    {
      id: "s7",
      title: "Expert Practice & Capstone",
      level: "Expert",
      summary:
        "Operate at engine-author level: build from source, optimize networking, package and ship, debug crashes — then prove it all with a capstone.",
      modules: [
        {
          id: "s7-m1",
          title: "Building & extending engine source",
          objectives: [
            "Build UE from source from GitHub and debug into engine code.",
            "Read engine source to answer your own API questions.",
            "Understand (carefully) how to make a local engine modification."
          ],
          resources: [
            { title: "Downloading Unreal Engine Source Code", url: "https://dev.epicgames.com/documentation/unreal-engine/downloading-source-code-in-unreal-engine", type: "doc" },
            { title: "Building Unreal Engine from Source", url: "https://dev.epicgames.com/documentation/unreal-engine/building-unreal-engine-from-source", type: "doc" },
            { title: "Unreal Engine on GitHub (request access)", url: "https://www.unrealengine.com/ue-on-github", type: "repo" }
          ],
          exercises: [
            {
              id: "s7-m1-e1",
              title: "Debug into the engine",
              kind: "challenge",
              difficulty: "hard",
              goal: "Treat the engine as readable, debuggable code.",
              steps: [
                "Build the engine from source (Development Editor).",
                "Set a breakpoint inside an engine function your game calls (e.g. AActor::BeginPlay).",
                "Hit it from your game and walk up the callstack into engine code."
              ],
              acceptance: ["You can step from your game code into engine source and back."],
              hints: ["Source builds take a long time and a lot of disk — plan for it."]
            }
          ]
        },
        {
          id: "s7-m2",
          title: "Advanced networking & optimization",
          objectives: [
            "Reduce bandwidth with the push model and relevancy.",
            "Understand the Replication Graph for large-scale games.",
            "Profile network traffic and prioritize replication."
          ],
          resources: [
            { title: "Networking overview (server authority, relevancy)", url: "https://dev.epicgames.com/documentation/unreal-engine/networking-and-multiplayer-in-unreal-engine", type: "doc" },
            { title: "Networking overview (authority, relevancy, optimization)", url: "https://dev.epicgames.com/documentation/unreal-engine/networking-overview-for-unreal-engine", type: "doc" },
            { title: "Introduction to Iris (5.x replication system)", url: "https://dev.epicgames.com/documentation/unreal-engine/introduction-to-iris-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s7-m2-e1",
              title: "Push-model a replicated property",
              kind: "challenge",
              difficulty: "hard",
              goal: "Cut wasted replication comparisons.",
              steps: [
                "Convert a frequently-checked replicated property to the push model.",
                "Mark it dirty only when it actually changes (MARK_PROPERTY_DIRTY_FROM_NAME).",
                "Compare network profiler output before/after."
              ],
              acceptance: ["The property still replicates correctly with measurably less overhead."],
              hints: ["Enable push model for the class with the appropriate net flags before relying on dirty marking."]
            },
            {
              id: "s7-m2-e2",
              title: "Challenge: tune relevancy & update frequency",
              kind: "challenge",
              difficulty: "hard",
              goal: "Spend bandwidth where players can perceive it.",
              steps: [
                "Spawn a few dozen replicated actors and record a baseline with 'stat net' and the network profiler.",
                "Lower NetUpdateFrequency on slow-changing actors and tighten NetCullDistanceSquared on cosmetic ones.",
                "Re-measure and note which changes a second player can actually perceive in PIE."
              ],
              acceptance: ["Measurably fewer replicated bits per second with no perceivable gameplay difference for clients."],
              hints: ["Relevancy culls whole actors per-connection; update frequency throttles how often relevant ones are considered — they attack different costs."]
            }
          ]
        },
        {
          id: "s7-m3",
          title: "Packaging, shipping & crash debugging",
          objectives: [
            "Build Shipping vs. Development configurations and understand the differences.",
            "Package the game and diagnose packaging failures.",
            "Read a crash dump / callstack and symbolicate it."
          ],
          resources: [
            { title: "Packaging Unreal Engine Projects", url: "https://dev.epicgames.com/documentation/unreal-engine/packaging-your-project", type: "doc" },
            { title: "Build configurations", url: "https://dev.epicgames.com/documentation/unreal-engine/build-configurations-reference-for-unreal-engine", type: "doc" },
            { title: "Testing & optimizing your content", url: "https://dev.epicgames.com/documentation/unreal-engine/testing-and-optimizing-your-content", type: "doc" },
            { title: "Setting Up Dedicated Servers in Unreal Engine", url: "https://dev.epicgames.com/documentation/unreal-engine/setting-up-dedicated-servers-in-unreal-engine", type: "doc" }
          ],
          exercises: [
            {
              id: "s7-m3-e1",
              title: "Ship a packaged build",
              kind: "exercise",
              difficulty: "hard",
              goal: "Cross the gap from 'runs in editor' to 'runs as an app'.",
              steps: [
                "Package your game in Shipping for your platform.",
                "Fix at least one issue that only appears in a packaged/Shipping build (e.g. a missing asset reference or an editor-only code path).",
                "Run the packaged build standalone."
              ],
              acceptance: ["A Shipping build of your game runs outside the editor."],
              hints: ["Editor-only code must be guarded by WITH_EDITOR or it won't exist in Shipping."]
            },
            {
              id: "s7-m3-e2",
              title: "Package a Linux Shipping build",
              kind: "exercise",
              difficulty: "hard",
              goal: "Ship for Linux the way a build farm would: from the terminal, in Shipping, run from a bare prompt.",
              steps: [
                "Package from the command line: Engine/Build/BatchFiles/RunUAT.sh BuildCookRun -project=/abs/path/YourGame.uproject -platform=Linux -clientconfig=Shipping -build -cook -stage -pak -package.",
                "Run the staged build's launch script (or the binary under YourGame/Binaries/Linux/) from a terminal on a Vulkan-capable machine.",
                "Find where a packaged Linux game writes its Saved data and logs (~/.config/Epic/<Project>/) and confirm what Shipping did to logging."
              ],
              acceptance: [
                "The Shipping build runs standalone on Linux outside the editor.",
                "You can say where Saved/ lives for a packaged Linux build and why the log is empty in Shipping by default."
              ],
              hints: ["Shipping compiles logging out unless you set bUseLoggingInShipping in the target rules — verify behavior in Development first, then flip to Shipping."]
            },
            {
              id: "s7-m3-e3",
              title: "Challenge: a Linux dedicated server",
              kind: "challenge",
              difficulty: "hard",
              goal: "Run your game the way live multiplayer games actually run: a headless Linux server with real clients connecting.",
              steps: [
                "With your source-built engine (see 'Building & extending engine source' above — installed builds cannot build Server targets), add a YourGameServer.Target.cs with Type = TargetType.Server.",
                "Build and package it: RunUAT.sh BuildCookRun -project=... -platform=Linux -serverplatform=Linux -server -serverconfig=Development -build -cook -stage -pak.",
                "Start it headless with ./YourGameServer -log, then from a client build (or PIE on another machine) connect with open <server-ip>:7777 and watch the server log the join."
              ],
              acceptance: [
                "The server runs without rendering, logs the client connection, and the client plays with replicated state.",
                "You can explain why the Server target needs a source-built engine."
              ],
              hints: [
                "No connection? It's almost always the network path: UDP port 7777 open, server bound on the right interface, client using the server's reachable IP.",
                "A dedicated server has no cooked client content — cook for both server and client platforms or the client will fail to load the map."
              ]
            }
          ]
        },
        {
          id: "s7-m4",
          title: "Capstone project",
          objectives: [
            "Integrate the whole path into one cohesive, networked, profiled, packaged project.",
            "Demonstrate clean C++/Blueprint boundaries and a tool you built for it.",
            "Ship it."
          ],
          resources: [
            { title: "Epic Developer Community — getting started hub", url: "https://dev.epicgames.com/community/unreal-engine/getting-started", type: "doc" },
            { title: "Sample game projects", url: "https://dev.epicgames.com/documentation/unreal-engine/sample-game-projects-for-unreal-engine", type: "repo" },
            { title: "Lyra Sample Game (reference)", url: "https://dev.epicgames.com/documentation/unreal-engine/lyra-sample-game-in-unreal-engine", type: "doc" },
            { title: "Lyra Starter Game — guided learning path", url: "https://dev.epicgames.com/community/learning/paths/Z4/lyra-starter-game", type: "doc" }
          ],
          exercises: [
            {
              id: "s7-m4-e1",
              title: "Capstone: a vertical slice",
              kind: "challenge",
              difficulty: "hard",
              goal: "Prove end-to-end mastery on something you'd show an employer.",
              steps: [
                "Design a small multiplayer vertical slice: a GAS-driven ability, replicated state, an AI opponent, and a UMG HUD.",
                "Build one custom editor tool (a Details customization, Editor Utility Widget, or commandlet) that aided production.",
                "Profile it with Insights, fix the worst hitch, then package and run a Shipping build."
              ],
              acceptance: [
                "Networked play works with server authority.",
                "GAS, AI, and C++-bound UMG are all present.",
                "You built and used at least one custom editor tool, and shipped a packaged build."
              ],
              hints: ["Scope ruthlessly — one polished ability and one AI beats ten half-finished systems."]
            }
          ]
        }
      ]
    }
  ]
};
