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
            { title: "JetBrains Rider for Unreal Engine", url: "https://www.jetbrains.com/lp/rider-unreal/", type: "doc" }
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
            { title: "UPROPERTY specifiers reference", url: "https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-uproperty-specifiers", type: "doc" },
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
            { title: "Tom Looman — free 'Unreal Engine C++' course materials", url: "https://courses.tomlooman.com/p/unrealengine-cpp", type: "video" }
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
            { title: "Gameplay Framework quick reference", url: "https://dev.epicgames.com/documentation/unreal-engine/gameplay-framework-in-unreal-engine", type: "doc" }
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
            { title: "Blueprints and C++ — how they work together", url: "https://dev.epicgames.com/documentation/unreal-engine/blueprints-visual-scripting-in-unreal-engine", type: "doc" }
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
            { title: "tranek/GASDocumentation (community deep-dive)", url: "https://github.com/tranek/GASDocumentation", type: "repo" }
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
            { title: "RPCs (Remote Procedure Calls)", url: "https://dev.epicgames.com/documentation/unreal-engine/rpcs-in-unreal-engine", type: "doc" }
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
            { title: "C++ API: USubsystem", url: "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Engine/Subsystems/USubsystem", type: "doc" }
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
            { title: "C++ API: UAnimInstance", url: "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Engine/UAnimInstance", type: "doc" }
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
            { title: "Multi-threading & FRunnable (C++ API: FRunnable)", url: "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Core/HAL/FRunnable", type: "doc" }
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
            { title: "UMG UI Designer", url: "https://dev.epicgames.com/documentation/unreal-engine/umg-ui-designer-for-unreal-engine", type: "doc" },
            { title: "Slate UI programming framework", url: "https://dev.epicgames.com/documentation/unreal-engine/slate-user-interface-programming-framework-for-unreal-engine", type: "doc" },
            { title: "benui — Unreal UI articles (community)", url: "https://benui.ca/unreal/", type: "doc" }
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
            { title: "Details panel customization", url: "https://dev.epicgames.com/documentation/unreal-engine/details-panel-customization-in-unreal-engine", type: "doc" }
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
            { title: "Downloading Unreal Engine Source Code", url: "https://dev.epicgames.com/documentation/unreal-engine/downloading-unreal-engine-source-code", type: "doc" },
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
            { title: "Networking overview (authority, relevancy, optimization)", url: "https://dev.epicgames.com/documentation/unreal-engine/networking-overview-for-unreal-engine", type: "doc" }
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
            { title: "Packaging Unreal Engine Projects", url: "https://dev.epicgames.com/documentation/unreal-engine/packaging-unreal-engine-projects", type: "doc" },
            { title: "Build configurations", url: "https://dev.epicgames.com/documentation/unreal-engine/build-configurations-reference-for-unreal-engine", type: "doc" },
            { title: "Testing & optimizing your content", url: "https://dev.epicgames.com/documentation/unreal-engine/testing-and-optimizing-your-content", type: "doc" }
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
            { title: "Sample game projects", url: "https://dev.epicgames.com/documentation/unreal-engine/sample-game-projects-for-unreal-engine", type: "repo" }
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
